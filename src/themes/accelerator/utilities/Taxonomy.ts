import type { Entry } from '@util/Languages';

import t from '@util/language.json';

import { SITE } from '@config';
import { getPages } from '@util/PageQueries';
import { getItem, setItem } from '@util/Cache';
import { addSlashToAddress } from '@util/Url';

type TaxonomyEntry = {
    title: string;
    count: number;
};

type Taxonomy = { 
    tags: TaxonomyEntry[];
    topTags: TaxonomyEntry[];
    categories: TaxonomyEntry[];
};

export function sortByTitle (a: TaxonomyEntry, b: TaxonomyEntry) {
  if ( a.title < b.title ){
    return -1;
  }

  if ( a.title > b.title ){
    return 1;
  }
  
  return 0;
}

export function taxonomyLinks(lang: (entry: Entry) => string) {
    const category = lang(t.articles.category) ?? 'category';
    const categoryLink = `${SITE.subfolder}/${category}/`;

    const tag = lang(t.articles.tag) ?? 'category';
    const tagLink = `${SITE.subfolder}/${tag}/`;

    return {
        tag: tag,
        category: category,
        getCategoryLink: (category: string) => {
            return addSlashToAddress(categoryLink + category.toLowerCase().replace(/ /g, '-') + '/1/');
        },
        getTagLink: (tag: string) => {
            return addSlashToAddress(tagLink + tag.toLowerCase().replace(/ /g, '-') + '/1/');
        }
    };

}

export async function getTaxonomy (): Promise<Taxonomy> {
    const cacheKey = 'Global__taxonomy';

    let taxonomy: Taxonomy = await getItem(cacheKey);

    if (taxonomy == null) {
        const allPages = await getPages();
        const tags: { [key: string]: number } = {};
        const cats: { [key: string]: number } = {};

        // Get taxonomy and counts
        allPages.forEach((p) => {
            p.frontmatter.tags && p.frontmatter.tags.forEach(t => {
                tags[t] = (tags[t] ?? 0) + 1;
            });

            p.frontmatter.categories && p.frontmatter.categories.forEach(c => {
                cats[c] = (cats[c] ?? 0) + 1;
            });
        });

        // Map into the taxonomy
        taxonomy = {
            tags: Object.keys(tags).sort().map(x => {
                return {
                    title: x,
                    count: tags[x]
                };
            }),
            topTags: [],
            categories: Object.keys(cats).sort().map(x => {
                return {
                    title: x,
                    count: cats[x]
                };
            })
        };

        // Get a list of "top tags" by usage count
        const length = Math.min(taxonomy.categories.length, taxonomy.tags.length);
        taxonomy.topTags = taxonomy.tags
            .sort((a, b) => b.count - a.count)
            .slice(0, length)
            .sort((a, b) => {
                if ( a.title < b.title ){
                    return -1;
                }
                if ( a.title > b.title ){
                    return 1;
                }
                return 0;
             });

        await setItem(cacheKey, taxonomy);
    }

    return taxonomy;
}
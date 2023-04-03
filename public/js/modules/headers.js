import { qsa } from './query.js';

const link = `<svg xmlns="http://www.w3.org/2000/svg" title="Link" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
<path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
</svg>`;

/** 
 * Enables copy on code blocks (<pre><code>...)
*/
function enhanceHeaders() {

    // Make code blocks focusable, so they can be keyboard scrolled
    qsa('h2[id], h3[id], h4[id], h5[id], h6[id]').forEach((elem) => {
        const linkContainer = document.createElement('a');
        linkContainer.href = `#${elem.id}`;
        linkContainer.className = 'bookmark-link';
        linkContainer.innerHTML = link;
        console.log(elem, typeof elem);
        elem.appendChild(linkContainer);
    });

   
}

export { enhanceHeaders }
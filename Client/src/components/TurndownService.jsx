import TurndownService from 'turndown';

const turndownService = new TurndownService();

export function convertHtmlToMarkdown(html) {
    return turndownService.turndown(html);
}

import { blockResolver, pageResolver } from './componentResolver';
import LandingPage from '../../content/pages/LandingPage.vue';
import TeaserColumnsBlock from '../../content/blocks/TeaserColumnsBlock.vue';
import QuoteBlock from '../../content/blocks/QuoteBlock.vue';
import ArticleBuilderBlock from '../../content/blocks/ArticleBuilderBlock.vue';
import TextBlock from '../../content/blocks/TextBlock.vue';
import ImageBlock from '../../content/blocks/ImageBlock.vue';
import ImageGalleryOneBlock from '../../content/blocks/ImageGalleryOneBlock.vue';
import ImageGalleryItemBlock from '../../content/blocks/ImageGalleryItemBlock.vue';
import ContentPage from '../../content/pages/ContentPage.vue';
import MiniBlocksBlock from '../../content/blocks/MiniBlocksBlock.vue';
import CombinationOneBlock from '../../content/blocks/CombinationOneBlock.vue';
import BulletListBlock from '../../content/blocks/BulletListBlock.vue';
import MiniBlockParagraphWithCtaBlock from '../../content/blocks/MiniBlockParagraphWithCtaBlock.vue';
import MiniBlockQuoteBlock from '../../content/blocks/MiniBlockQuoteBlock.vue';

export function config() {
    registerPages();
    registerBlocks();
}

function registerPages() {
    pageResolver.register('landingPage', LandingPage);
    pageResolver.register('contentPage', ContentPage);
}

function registerBlocks() {
    blockResolver.register('teaserColumnsBlock', TeaserColumnsBlock);
    blockResolver.register('quoteBlock', QuoteBlock);
    blockResolver.register('articleBuilderBlock', ArticleBuilderBlock);
    blockResolver.register('paragraphWithCtaBlock', TextBlock);
    blockResolver.register('imageWithCtaBlock', ImageBlock);
    blockResolver.register('imageBlock', ImageBlock);
    blockResolver.register('imageGalleryOneBlock', ImageGalleryOneBlock);
    blockResolver.register('imageGalleryItemBlock', ImageGalleryItemBlock);
    blockResolver.register('miniBlocksBlock', MiniBlocksBlock);
    blockResolver.register('combinationOneBlock', CombinationOneBlock);
    blockResolver.register('bulletListBlock', BulletListBlock);
    blockResolver.register('leadAndTitleBlock', TextBlock);
    blockResolver.register('richTextBlock', TextBlock);
    blockResolver.register('miniBlockParagraphWithCtaBlock', MiniBlockParagraphWithCtaBlock);
    blockResolver.register('miniBlockQuoteBlock', MiniBlockQuoteBlock);
}
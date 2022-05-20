<template>
    <div>
        <div class="overflow-hidden"
             :class="`bg-${theme}-300 -tile`">
            <div class="sustainability--frontpage-hero-block p-20 pb-56">
                <!--Negative margins is used to ensure that the background goes fully to the top and left of the parent inset.
                The background element must be placed first to ensure that other content is displayed on top of it.-->
                <div class="sustainability--frontpage-hero-block__background -mt-50 -mr-50 -ml-50"
                     :class="`bg-${theme}-500 -tile`">
                </div>
                <div v-if="content.headerTopBlock.length"
                     class="text-spot-wrapper py-40 md:p-56 lg:p-40 lg:pl-0 lg:pb-56 xl:p-56 xl:pb-120">
                    <ContentBlockList :blocks="content.headerTopBlock"/>
                </div>
                <div v-if="content.headerImage"
                     class="image-spot-wrapper lg:pt-56 xl:pl-56 ">
                    <ImageSpot :image="content.headerImage"
                               aspect-ratio="3x2"/>
                </div>
                <div class="navigation-spot-wrapper md:py-40 lg:py-56 lg:pr-40 xl:px-56">
                    <nav class="rounded-3 overflow-hidden">
                        <header class="py-25 px-35 h3 text-white"
                                :class="`bg-${theme}-600`">
                            {{ navigation.title }}
                        </header>
                        <ul class="list-none m-0 p-35 py-25 bg-white-100">
                            <li>
                                <button @click="changeTheme">
                                    change theme
                                </button>
                            </li>
                            <li v-for="(subpage, index) in navigation.pages"
                                :key="index + '_' + subpage.name"
                                class="my-10">
                                <a :href="subpage.url">
                                    {{ subpage.name }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div v-if="content.headerBottomBlock.length"
                     class="quote-spot-wrapper pt-20 md:flex md:items-center md:py-40 md:pl-56 lg:mt-56 lg:py-0 lg:pl-0 xl:pl-56 xl:mt-120">
                    <ContentBlockList :blocks="content.headerBottomBlock"/>
                </div>
            </div>
        </div>
        <section v-if="content.contentBlocks.length">
            <ContentBlockList :blocks="content.contentBlocks"
                              is-root-list/>
        </section>
    </div>
</template>
<script lang="ts">
import ContentBlockList from '../../core/content/ContentBlockList.vue';
import {UmbLandingPage, UmbMetadata, UmbNavigation} from '../../types/umb-models';
import ImageSpot from '../spots/ImageSpot.vue';
import {defineComponent, PropType, ref} from 'vue-demi';

interface UmbNavigationPage {
    children: number | null,
    name: string,
    url: string
}

interface tmpUmbNavigation extends UmbNavigation {
    pages: UmbNavigationPage[],
    title: string
}

export default defineComponent({
    name: 'LandingPage',
    components: {
        ImageSpot,
        ContentBlockList,
    },
    props: {
        content: {
            type: Object as PropType<UmbLandingPage>,
            required: true,
        },
        metadata: {
            type: Object as PropType<UmbMetadata | undefined>,
            default: undefined,
        },
        navigation: {
            type: Object as PropType<tmpUmbNavigation | undefined>,
            default: undefined,
        },
    },
    setup(props) {
        // const theme = props.content.headerTheme.toLowerCase();
        const theme = ref(props.content.headerTheme.toLowerCase());
        
        function changeTheme() {
            const themes = ['leaf', 'sky', 'bark', 'wheat', 'sea'];
            const currentIndex = themes.indexOf(theme.value);
            if (currentIndex === 4) {
                theme.value = 'leaf';
                return;
            }
            theme.value = themes[currentIndex + 1];
        }
        
        return {
            theme,
            changeTheme,
        };
    },
});
</script>

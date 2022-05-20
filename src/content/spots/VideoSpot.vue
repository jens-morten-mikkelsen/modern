<template>
    <article>
        <template v-if="cookiesAccepted">
            <div class="video-tile"
                 :class="{'video-tile--is-inline' : useInlinePlayer}">
                <div v-if="showSplash && !autoplay"
                     ref="animationTrigger"
                     class="video-tile__wrap flex items-center justify-center cursor-pointer"
                     :class="contentWrapperClass"
                     @click="hideSplash">
                    <img ref="animationTarget"
                         :src="splashImage.url"
                         :alt="splashImage.name"
                         class="object-cover w-full h-full"
                         :class="{'js-animation-video-tile transform scale-110': !disableZoomEntryAnimation}">
                    <button class="-btn-text flex flex-col absolute">
                        <span class="flex items-center justify-center rounded-full text-shadow-soft border-2 border-solid border-white-100 h-44 w-44 md:h-50 md:w-50">
                            <i class="icon-play_filled text-18 text-white-100 md:text-20"></i>
                        </span>
                        <span v-if="splashTitle"
                              class="mt-15 text-shadow-soft md:mt-30 text-13 text-white md:text-16">
                            {{ splashTitle }}
                        </span>
                    </button>
                </div>
                <div v-else
                     class="preserve-aspect-ratio aspect-ratio-16x9">
                    <iframe class="preserve-aspect-ratio__video"
                            :src="playerUrl"
                            :class="iframeClass"
                            frameborder="0"
                            webkitallowfullscreen
                            mozallowfullscreen
                            allowfullscreen
                            allow="autoplay">
                    </iframe>
                </div>
            </div>
        </template>
        <div v-else
             class="flex w-full items-center justify-center bg-white-300 font-semibold"
             :class="{'h-full': !smallCookieTextBox}">
            <p class="py-35">
                {{ fallbackText }}
            </p>
        </div>
    </article>
</template>

<script lang="ts">
import {UmbMedia, UmbVideoUrlModel} from '@/types/umb-models';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {defineComponent, PropType, onDeactivated, ref} from 'vue-demi';

export default defineComponent({
    name: 'VideoSpot',
    props: {
        video: {
            type: Object as PropType<UmbVideoUrlModel>,
            required: true,
        },
        splashImage: {
            type: Object as PropType<UmbMedia | undefined>,
            default: undefined,
        },
        splashTitle: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        disableZoomEntryAnimation: {
            type: Boolean,
            default: false,
        },
        contentWrapperClass: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        iframeClass: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        fallbackText: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        smallCookieTextBox: {
            type: Boolean,
            default: false,
        },
        /*TODO: If overlay player logic is going to be removed or is not wanted, this prop can be removed.*/
        useInlinePlayer: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        const showSplash = ref(!!props.splashImage);
        const playVideo = ref(props.autoplay);
        let animationTimeline: gsap.core.Timeline;
        
        // TODO: cookie service, and new definition of cookie system
        const cookiesAccepted = true;

        // TODO: implement logic for youtube/vimeo videos
        const playerUrl = getPlayerUrl();
        function getPlayerUrl(): string {
            let playerUrl = props.video.url;
            if (props.autoplay) {
                playerUrl += `${(playerUrl.indexOf('?') > -1 ? '&' : '?')}autoplay=1`;
            }
            return playerUrl;
        }
        //-- end-TODO

        function hideSplash(): void {
            showSplash.value = false;
            playVideo.value = true;
        }
        
        // Gsap animations
        const animationTarget = ref(null);
        const animationTrigger = ref(null);
        if (!props.disableZoomEntryAnimation) {
            
            animationTimeline = gsap.timeline()
                .to(animationTarget.value, {
                    scale: 1,
                    duration: 2,
                });
            ScrollTrigger.create({
                animation: animationTimeline,
                trigger: animationTrigger.value,
                toggleActions: 'restart none restart none',
                markers: true,
            });
            
            onDeactivated(() => {
                // kill gsap
                animationTimeline.kill();
            });
        }
        
        return {
            showSplash,
            playVideo,
            cookiesAccepted,
            playerUrl,
            hideSplash,
            animationTarget,
            animationTrigger,
        };
    },
});
</script>

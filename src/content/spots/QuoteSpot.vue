<template>
    <figure class="quote-tile">
        <blockquote class="italic m-0"
                    :class="{'flex': !inlineQuoteIcon && (iconPosition === 'left' || iconPosition === 'right'), 'flex-row-reverse justify-end': iconPosition === 'right'}">
            <i v-if="!hideQuoteIcon"
               class="icon-quote w-32 flex-shrink-0 text-32 opacity-25 md:w-40 md:text-40"
               :class="[iconClass, inlineQuoteIcon ? 'inline-block' : 'block', {'mr-10': iconPosition === 'left', 'ml-10 rotate-quote-icon-180': iconPosition === 'right'}]"></i>
            <span class="inline-block mt-5 md:inline"
                  :class="[{'md:mt-15': iconPosition === 'top' || iconPosition === 'left'}, quoteClass]">
                {{ quote }}
            </span>
        </blockquote>
        <figcaption v-if="captionAuthorDisplayValue || captionAdditionalInfoDisplayValue"
                    class="block text-16 mt-15 font-brand"
                    :class="[captionClass, {'md:ml-50': !hideQuoteIcon && !inlineQuoteIcon && iconPosition === 'left', 'md:mr-50': !hideQuoteIcon && !inlineQuoteIcon && iconPosition === 'right'}]">
            <b>
                {{ captionAuthorDisplayValue }}<span class="font-normal">{{ captionAdditionalInfoDisplayValue }}</span>
            </b>
        </figcaption>
    </figure>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'QuoteSpot',
    props: {
        quote: {
            type: String,
            required: true,
        },
        author: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        authorAdditionalInfo: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        hideQuoteIcon: {
            type: Boolean,
            default: false,
        },
        inlineQuoteIcon: {
            type: Boolean,
            default: false,
        },
        iconPosition: {
            type: String,
            default: 'left',
            validator: (value: string) => ['top', 'right', 'left'].includes(value),
        },
        iconClass: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        quoteClass: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        captionClass: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
    },
    setup(props) {
        /*
        * captionAuthorDisplayValue and captionAdditionalInfoDisplayValue
        * Generates display safe versions of captionAuthor and captionAdditionalInfo.
        * This is done to ensure that the Author and AdditionalInfo is properly split with ","
        * */
        function generateCaptionAuthorDisplayValue(): string | undefined {
            if (props.author && props.author.lastIndexOf(',') === props.author.length - 1) {
                return props.author.substring(0, props.author.length - 1);
            }
            return props.author;
        }

        function generateCaptionAdditionalInfoDisplayValue(): string | undefined {
            if (!props.author
                || !props.authorAdditionalInfo
                || props.authorAdditionalInfo.indexOf(',') === 0) {
                return props.authorAdditionalInfo;
            }
            return ', ' + props.authorAdditionalInfo;
        }

        const captionAuthorDisplayValue = generateCaptionAuthorDisplayValue();
        const captionAdditionalInfoDisplayValue = generateCaptionAdditionalInfoDisplayValue();
        
        return {
            captionAuthorDisplayValue,
            captionAdditionalInfoDisplayValue,
        };
    },
});
</script>

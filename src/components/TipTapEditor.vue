<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, onBeforeUnmount  } from 'vue'
import { useRoute } from 'vue-router'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        'border border-gray-500 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto',
      // "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
    },
    // transformPastedText(text) {
    //   return text.toUpperCase();
    // },
  },
  content: `
I'm running Tiptap with Vue.js. 🎉🎉🎉🎉 👏
`,
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit,
  ],
});
onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
<template>
  <!-- <div class="flex mt-12 justify-center">
    <editor-content :editor="editor" />
  </div> -->
  <div v-if="editor" class="container mx-auto max-w-4xl my-8">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('bold') }"
        >
          Bold
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('italic') }"
        >
          Italic
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('strike') }"
        >
          Strike
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('code') }"
        >
          Code
        </button>
        <button class="btn btn-outline-primary btn-sm m-auto p-2" type="button" @click="editor.chain().focus().unsetAllMarks().run()">
          Clear marks
        </button>
        <button class="btn btn-outline-primary btn-sm m-auto p-2" type="button" @click="editor.chain().focus().clearNodes().run()">
          Clear nodes
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('paragraph') }"
        >
          Paragraph
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          H4
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          H5
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          H6
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('bulletList') }"
        >
          Bullet list
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('orderedList') }"
        >
          Ordered list
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('codeBlock') }"
        >
          Code block
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{ 'is-active': editor.isActive('blockquote') }"
        >
          Blockquote
        </button>
        <button type="button" class="btn btn-outline-primary btn-sm m-auto p-2" @click="editor.chain().focus().setHorizontalRule().run()">
          Horizontal rule
        </button>
        <button type="button" class="btn btn-outline-primary btn-sm m-auto p-2" @click="editor.chain().focus().setHardBreak().run()">
          Hard break
        </button>
        <button type="button" class="btn btn-outline-primary btn-sm m-auto p-2"
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          Undo
        </button>
        <button type="button" class="btn btn-outline-primary btn-sm m-auto p-2"
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          Redo
        </button>
        <button
          @click="editor.chain().focus().setColor('#958DF1').run()"
          type="button"
          :class="`btn btn-outline-primary btn-sm m-auto p-2`+{
            'is-active': editor.isActive('textStyle', { color: '#958DF1' }),
          }"
        >
          Purple
        </button>
      </div>
    </div>
    <EditorToolbar :editor="editor" />
    <EditorContent :editor="editor" />
  </div>
</template>
<style lang="scss">
.btn-size-box {
    margin: 10px;
    padding: 5px;
}
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>

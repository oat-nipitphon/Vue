<script setup>
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Underline from '@tiptap/extension-underline'

const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        'border border-gray-400 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto',
    },
  },
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [Underline, StarterKit],
})

// ฟังก์ชันสำหรับจัดการ Format ข้อความ
const toggleHeading = level => {
  if (!editor.value) return
  if (editor.value.isActive('heading', { level })) {
    editor.value.chain().focus().setParagraph().run()
  } else {
    editor.value.chain().focus().toggleHeading({ level }).run()
  }
}

const toggleFormat = format => {
  if (!editor.value) return
  editor.value.chain().focus()[format]().run()
}

const toggleList = listType => {
  if (!editor.value) return
  editor.value.chain().focus()[listType]().run()
}

const undo = () => {
  if (!editor.value) return
  editor.value.chain().focus().undo().run()
}

const redo = () => {
  if (!editor.value) return
  editor.value.chain().focus().redo().run()
}
</script>

<template>
  <div class="w-full">
    <div class="mx-auto max-w-4xl">
      <section
        v-if="editor"
        class="buttons flex items-center flex-wrap gap-x-4 border-t border-l border-r border-gray-400 p-1"
      >
        <!-- ตัวหนา -->
        <button
          @click="toggleFormat('toggleBold')"
          :class="{ 'bg-gray-300 rounded': editor.isActive('bold') }"
          class="p-1"
        >
          Bold
        </button>

        <!-- ตัวเอียง -->
        <button
          @click="toggleFormat('toggleItalic')"
          :class="{ 'bg-gray-300 rounded': editor.isActive('italic') }"
          class="p-1"
        >
          Italic
        </button>

        <!-- ขีดเส้นใต้ -->
        <button
          @click="toggleFormat('toggleUnderline')"
          :class="{ 'bg-gray-300 rounded': editor.isActive('underline') }"
          class="p-1"
        >
          Underline
        </button>

        <!-- Heading -->
        <button
          @click="toggleHeading(1)"
          :class="{ 'bg-gray-300': editor.isActive('heading', { level: 1 }) }"
          class="p-1"
        >
          H1
        </button>
        <button
          @click="toggleHeading(3)"
          :class="{ 'bg-gray-300': editor.isActive('heading', { level: 3 }) }"
          class="p-1"
        >
          H3
        </button>
        <button
          @click="toggleHeading(5)"
          :class="{ 'bg-gray-300': editor.isActive('heading', { level: 5 }) }"
          class="p-1"
        >
          H5
        </button>

        <!-- รายการ -->
        <button
          @click="toggleList('toggleBulletList')"
          :class="{ 'bg-gray-300': editor.isActive('bulletList') }"
          class="p-1"
        >
          List
        </button>
        <button
          @click="toggleList('toggleOrderedList')"
          :class="{ 'bg-gray-300': editor.isActive('orderedList') }"
          class="p-1"
        >
          Ordered List
        </button>

        <!-- โค้ดบล็อก -->
        <button
          @click="toggleFormat('toggleCodeBlock')"
          :class="{ 'bg-gray-300': editor.isActive('codeBlock') }"
          class="p-1"
        >
          Code
        </button>

        <!-- Blockquote -->
        <button
          @click="toggleFormat('toggleBlockquote')"
          :class="{ 'bg-gray-300': editor.isActive('blockquote') }"
          class="p-1"
        >
          Block
        </button>

        <!-- ย้อนกลับ / ไปข้างหน้า -->
        <button
          @click="undo"
          :disabled="!editor.can().chain().focus().undo().run()"
          class="p-1"
        >
          Undo
        </button>
        <button
          @click="redo"
          :disabled="!editor.can().chain().focus().redo().run()"
          class="p-1"
        >
          Redo
        </button>
      </section>
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

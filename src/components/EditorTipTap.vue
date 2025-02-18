<script setup>
import { defineProps, defineEmits } from "vue";
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Underline from '@tiptap/extension-underline'

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits([
  'update:modelValue'
]);

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({editor}) => {
    // console.log(editor.getHTML());
    emit('update:modelValue', editor.getHTML());
  },
  extensions: [Underline, StarterKit],
  editorProps: {
    attributes: {
      class:
        'border border-gray-400 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto',
    },
  },
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-type-bold"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"
            />
          </svg>
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
          <img src="../assets/icon/editor-post/list-ul.svg" alt="">
        </button>
        <button
          @click="toggleList('toggleOrderedList')"
          :class="{ 'bg-gray-300': editor.isActive('orderedList') }"
          class="p-1"
        >
          <img src="../assets/icon/editor-post/list-ol.svg" alt="">
        </button>

        <!-- โค้ดบล็อก -->
        <button
          @click="toggleFormat('toggleCodeBlock')"
          :class="{ 'bg-gray-300': editor.isActive('codeBlock') }"
          class="p-1"
        >
          <img src="../assets/icon/editor-post/code-slash.svg" alt="">
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

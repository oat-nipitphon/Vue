<script setup>
import Swal from 'sweetalert2'
import axiosAPI from '@/services/axiosAPI'
import StarterKit from '@tiptap/starter-kit'
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Underline from '@tiptap/extension-underline'

const router = useRouter()
const authStore = useAuthStore()

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

const form = reactive({
  userID: authStore.storeUser.user_login.id,
  title: "",
  content: "",
});

const imageFile = ref(null);

const changeSelectImageFile = (event) => {
  imageFile.value =  event.target.files[0];
  console.log(imageFile.value);
};

const onSave = async () => {
  const formData = new FormData();
  formData.append("userID", form.userID);
  formData.append("title", form.title);
  formData.append("content", form.content);
  if (imageFile.value) {
    formData.append("imageFile", imageFile.value);
  }

  try {
    const res = await axiosAPI.post("/api/EditorTipTap/NewPost", formData, {
      headers: {
        "Content-Type": "muitipart/form-data",
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });

    const data = await res.json();
    if (res.data.status === 200) {
      console.log("successfully.");
    }

    console.log(res);

  } catch (error) {
    console.error("api upload editor tiptap function error", error);
  }

};

</script>
<template>
  <div class="container mx-auto max-w-4xl my-8 mt-10">
    <div class="max-w-4xl m-auto mt-2 mb-2">
      <label for="title-post">ชื่อเรื่อง</label>
      <input v-model="form.title" type="text" class="form-control" />
    </div>
    <div class="control-group max-w-4xl m-auto mt-5">
      <section
        v-if="editor"
        class="buttons flex items-center flex-wrap gap-x-4 border-t border-l border-r border-gray-400 p-1"
      >
        <!-- ตัวหนา -->
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'bg-gray-300 rounded': editor.isActive('bold') }"
          class="p-1"
        >
          Bold
        </button>
        <!-- ตัวเอียง -->
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'bg-gray-300 rounded': editor.isActive('italic') }"
          class="p-1"
        >
          Italic
        </button>
        <button
          @click="editor.chain().focus().toggleUnderline().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'bg-gray-300 rounded': editor.isActive('underline') }"
          class="p-1"
        >
          Underline
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          class="p-1"
          :class="{ 'bg-gray-300': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          class="p-1"
          :class="{ 'bg-gray-300': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          class="p-1"
          :class="{ 'bg-gray-300': editor.isActive('heading', { level: 5 }) }"
        >
          H5
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          class="p-1"
          :class="{ 'bg-gray-300': editor.isActive('bulletList') }"
        >
          List
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          class="p-1"
          :class="{ 'bg-gray-300': editor.isActive('orderedList') }"
        >
          Ordered list
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          class="p-1"
          :class="{ 'bg-gray-300': editor.isActive('codeBlock') }"
        >
          Code
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          class="p-1"
          :class="{ 'bg-gray-300': editor.isActive('blockquote') }"
        >
          Block
        </button>
        <!-- ย้อนกลับ -->
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          class="p-1 :disabled:text-gray-400"
        >
          Undo
        </button>
        <!-- ไปข้างหน้า -->
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          class="p-1 :disabled:text-gray-400"
        >
          Redo
        </button>
        <!-- เคลียกล่องข้อความ -->
        <button
          @click="editor.chain().focus().setHorizontalRule().run()"
          class="p-1"
        >
          HR
        </button>
      </section>
    </div>

    <div class="max-w-4xl m-auto mt-2 mb-5">
      <EditorContent :editor="editor" v-model="form.content" />
    </div>
    <div class="flex">
      <input type="file" @change="changeSelectImageFile" class="form-control">
    </div>
    <div class="flex justify-end">
      <button @click="onSave" type="button" class="btn btn-md btn-primary">
        Save
      </button>
    </div>
  </div>
</template>
<style>
.tiptap h1{
  font-size: 32px;
  font-weight: bold;
}
</style>

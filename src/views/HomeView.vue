<script setup>
<<<<<<< HEAD
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import TextStyle from "@tiptap/extension-text-style";
import { Extension } from '@tiptap/core'
=======
>>>>>>> master


const router = useRouter();
const form = ref({
  title: "",
  content: "",
  userID: "",
});

// ใช้ useEditor อย่างถูกต้อง
const editor = useEditor({
  extensions: [
    StarterKit, 
    TextStyle, 
  ],
  content: "<p>เริ่มพิมพ์ที่นี่...</p>",
});


// ฟังก์ชันดึงข้อมูลจาก editor
const getEditorContent = () => {
  console.log(editor.value?.getHTML()); // ได้ HTML
  console.log(editor.value?.getText()); // ได้ข้อความดิบ
};
</script>

<template>
  <div class="container">
    <div class="w-full flex justify-center mt-10">
      <img class="icon-laravel" src="../assets/icon/laravel.png" alt="icon-laravel" />
      <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue" />
    </div>
<<<<<<< HEAD
    <div class="w-full flex justify-center mt-5">
      <editor-content v-if="editor" :editor="editor" />
    </div>
=======
>>>>>>> master
    <div class="w-full flex justify-center mt-5">
      <button @click="getEditorContent" class="btn">
        ดึงข้อมูลจาก Editor
      </button>
    </div>
  </div>
</template>

<style scoped>
.icon-laravel {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
.icon-vue {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
.btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #35495e;
}
</style>

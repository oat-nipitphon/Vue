<script setup>

</script>

<template>
  <div class="container">
    <div class="w-full flex justify-center mt-10">
      <img class="icon-laravel" src="../assets/icon/laravel.png" alt="icon-laravel" />
      <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue" />
    </div>
    <div class="mt-10 text-center text-lg">
      <p>
        1.userProfileView ยังไม่แสดงข้อมูล ไล่ข้อมูลลงใหม่
        <br> - แยก 
          <br> form user update edit 
          <br> -ออกจาก 
          <br> form user_profile
      </p>
      <p>
        2.AdminManagerUserProfileView
          -TableAdminUserProfile ยังไม่แสดงข้อมูล ไล่ลงใหม่
      </p>
      <p>
        3.รูปภาพ
        <br> **เวลาสร้างหรือ แก้ไข post ถ้าไม่ใส่ รูป จะ error แต่ข้อมูลเข้า sql post
        <br> **ปรับลดขนาด หรือ กำหนดขนาดของรูป ขนาดรูปภ่าพเกิน และ ไม่มีไฟล์ขึ้น 
          <br> - create post new view
          <br> - update edit post view

          <br> ** Navbar dropdown profile image 
          <br> สมัครใหม่จะไม่มีรูป ต้องทำให้ showImageData || showImageNull 
      </p>
      <p>
        4.ไล่เช็ค Swal เวลาดำเนินการ
         <br> - ข้อความ title , text , icon 
         <br> - button ข้อความ , สี
      </p>
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

<template>
  <div class="app-container">
    <!-- 🚀 左側側邊欄 -->
    <aside class="sidebar">
      <h2 class="logo">B310 機位登記系統</h2>
      <nav>
        <a href="#" class="nav-item active">📊 Reservation</a>
      </nav>
    </aside>

    <!-- 🌟 主要內容 -->
    <main class="content">
      <div class="header">
        <h1>Reservation</h1>
        <div class="filters">
          <el-input v-model="search" placeholder="🔍 Candidate Name" class="search-box" />
          <el-select v-model="statusFilter" placeholder="📌 Status">
            <el-option label="All" value="" />
          </el-select>
        </div>
      </div>

      <!-- 📋 表格 -->
      <div class="table-container">
        <el-table :data="reservations" class="custom-table" height="500">
          <el-table-column prop="reservation_id" label="預約編號" align="center" />
          <el-table-column prop="student_id" label="學生編號" align="center" />
          <el-table-column prop="seat_id" label="座位編號" align="center" />
          <el-table-column prop="timeslot_id" label="時段編號" align="center" />
          <el-table-column label="創建時間" align="center">
            <template #default="{ row }: { row: { create_time: string } }">
              {{ new Date(row.create_time).toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              }) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Reservation } from "./interfaces/Reservations";
import { asyncGet } from "./utils/fetch";
import { apis } from "./enum/api";

const reservations = ref<Array<Reservation>>([]);
const search = ref("");
const statusFilter = ref("");

onMounted(() => {
  asyncGet(apis.test).then((resp: Array<Reservation>) => {
    reservations.value = resp;
  });
});
</script>

<style scoped lang="scss">
/* 🚀 頁面佈局 */
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f8f9fc;
}

/* 🌟 側邊欄 */
.sidebar {
  width: 250px;
  background: linear-gradient(135deg, #a18cd1, #fbc2eb);
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: white;
}
.logo {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}
.nav-item {
  display: block;
  padding: 12px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: 0.3s;
}
.nav-item:hover, .nav-item.active {
  background: rgba(255, 255, 255, 0.3);
}

/* 🌟 主要內容 */
.content {
  flex: 1;
  padding: 30px;
}

/* 📌 標題區 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.filters {
  display: flex;
  gap: 10px;
}
.search-box {
  width: 200px;
}

/* 📋 表格樣式 */
.table-container {
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 📌 美化標題 */
:deep(.el-table__header-wrapper th) {
  background-color: #f4f6f9;
  color: #2c3e50;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 📌 滑鼠懸停效果 */
:deep(.el-table__row:hover) {
  background: rgba(52, 152, 219, 0.1);
}

/* 📌 美化滾動條 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background: #f0f0f0;
}
</style>
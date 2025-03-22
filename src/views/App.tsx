import { defineComponent, ref } from "vue";
import { ElMenu, ElMenuItem } from "element-plus";
import Reservation from "./Reservation.tsx";
import MultiDayBooking from "./MultiDayBooking.tsx";
import "../style/style.css";

export default defineComponent({
  setup() {
    const currentPage = ref("reservation"); // 預設顯示 Reservation

    return { currentPage };
  },
  render() {
    return (
      <div class="app-container">
        {/* Sidebar (側邊欄) */}
        <aside class="sidebar">
          <h2 class="logo">B310 機位登記系統</h2>

          <ElMenu default-active={this.currentPage} class="sidebar-menu">
            <ElMenuItem 
              index="reservation" 
              class={{ "is-active": this.currentPage === "reservation" }}
              onClick={() => (this.currentPage = "reservation")}
            >
              📊 Reservation
            </ElMenuItem>
            <ElMenuItem 
              index="multi-day" 
              class={{ "is-active": this.currentPage === "multi-day" }}
              onClick={() => (this.currentPage = "multi-day")}
            >
              📅 預約機位
            </ElMenuItem>
          </ElMenu>
        </aside>

        {/* 主要內容 */}
        <main class="content">
          {this.currentPage === "reservation" && <Reservation />}
          {this.currentPage === "multi-day" && <MultiDayBooking />}
        </main>
      </div>
    );
  },
});
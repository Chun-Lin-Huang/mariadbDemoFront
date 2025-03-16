import { defineComponent, ref, onMounted } from "vue";
import { ElInput, ElSelect, ElOption, ElTable, ElTableColumn } from "element-plus";
import type { Reservation } from "./interfaces/Reservations";
import { asyncGet } from "./utils/fetch";
import { apis } from "./enum/api";
import "./style.css";

export default defineComponent({
  setup() {
    const reservations = ref<Reservation[]>([]);
    const search = ref("");
    const statusFilter = ref("");

    onMounted(async () => {
      try {
        const resp = await asyncGet(apis.test);
        console.log("API Response:", resp);
        reservations.value = resp;
      } catch (error) {
        console.error("API Error:", error);
      }
    });

    return { reservations, search, statusFilter };
  },
  render() {
    return (
      <div class="app-container">
        {/* Sidebar */}
        <aside class="sidebar">
          <h2 class="logo">B310 機位登記系統</h2>
          <nav>
            <a href="#" class="nav-item active">📊 Reservation</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main class="content">
          {/* Header with Filters */}
          <div class="header">
            <h1>Reservation</h1>
            <div class="filters">
              <ElInput
                modelValue={this.search}
                onUpdate:modelValue={(val: string) => (this.search = val)}
                placeholder="🔍 Name"
                class="search-box"
              />
              <ElSelect
                modelValue={this.statusFilter}
                onUpdate:modelValue={(val: string) => (this.statusFilter = val)}
                placeholder="Status"
              >
                <ElOption label="All" value="" />
              </ElSelect>
            </div>
          </div>

          {/* Table */}
          <div class="table-container">
            <ElTable data={this.reservations} class="custom-table" height="500">
              <ElTableColumn prop="reservation_id" label="預約編號" align="center" />
              <ElTableColumn prop="student_id" label="學生編號" align="center" />
              <ElTableColumn prop="seat_id" label="座位編號" align="center" />
              <ElTableColumn prop="timeslot_id" label="時段編號" align="center" />
              <ElTableColumn prop="create_time" label="創建時間" align="center">
                {{
                  default: ({ row }: { row: { create_time: string } }) =>
                    <span>
                      {row.create_time
                        ? new Date(row.create_time).toLocaleString("zh-TW", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        : "-"}
                    </span>,
                }}
              </ElTableColumn>
            </ElTable>
          </div>
        </main>
      </div>
    );
  },
});
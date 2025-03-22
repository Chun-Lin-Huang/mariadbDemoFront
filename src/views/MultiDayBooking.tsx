import { defineComponent, ref, onMounted } from "vue";
import { ElInput, ElDatePicker, ElButton, ElTable, ElTableColumn, ElMessage } from "element-plus";
import { asyncGet, asyncPost } from "../utils/fetch";
import { apis } from "../enum/api";
import "../style/style.css";

export default defineComponent({
  setup() {
    const student_id = ref("");
    const seat_id = ref<number | null>(null);
    const timeslot_id = ref<number | null>(null);
    const reservation_date = ref("");

    const reservations = ref([]);

    const fetchMultiDayReservations = async () => {
      const resp = await asyncGet(apis.test);
      reservations.value = resp;
    };

    const submitReservation = async () => {
      try {
        await asyncPost(apis.multidayBooking, {
          student_id: student_id.value,
          seat_id: seat_id.value,
          timeslot_id: timeslot_id.value,
          reservation_date: reservation_date.value,
        });
        ElMessage.success("預約成功！");
        fetchMultiDayReservations();
      } catch (err: any) {
        if (err.message.includes("409")) {
          ElMessage.warning("此座位與時段已被預約！");
        } else {
          ElMessage.error("新增預約失敗！");
        }
      }
    };    

    onMounted(() => {
      fetchMultiDayReservations();
    });

    return {
      student_id,
      seat_id,
      timeslot_id,
      reservation_date,
      reservations,
      submitReservation,
    };
  },

  render() {
    return (
      <div>
        <h1>預約機位</h1>

        {/* 預約表單 */}
        <div style="margin-bottom: 20px; display: flex; gap: 10px;">
          <ElInput v-model={this.student_id} placeholder="學號" style="width: 150px;" />
          <ElInput v-model={this.seat_id} type="number" placeholder="座位" style="width: 100px;" />
          <ElInput v-model={this.timeslot_id} type="number" placeholder="時段" style="width: 100px;" />
          <ElDatePicker
            v-model={this.reservation_date}
            type="date"
            placeholder="選擇日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 160px;"
          />
          <ElButton type="primary" onClick={this.submitReservation}>
            新增
          </ElButton>
        </div>

        {/* Table */}
        <div class="table-container">
          <ElTable data={this.reservations} class="custom-table" height="500">
            <ElTableColumn prop="reservation_id" label="預約編號" align="center"  />
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
            <ElTableColumn prop="reservation_date" label="預約日期" align="center">
              {{
                default: ({ row }: { row: { reservation_date: string } }) =>
                  <span>
                    {row.reservation_date
                      ? new Date(row.reservation_date).toLocaleString("zh-TW", {
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
      </div>
    )
  },
});
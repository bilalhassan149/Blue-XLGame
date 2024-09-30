<template>
  <div class="records">
    <div class="data" style="margin-top: 0; width: 912px">
      <div>
        <div class="news_header">
          <div
            class="tab"
            :class="{ current_tab: '' == page.page.messageType }"
            @click="typeClcik('')"
          >
            <div :class="{ 'arrow down': '' == page.page.messageType }"></div>
            所有
            <div :class="{ 'arrow up': '' == page.page.messageType }"></div>
          </div>
          <div
            class="tab"
            :class="{
              current_tab: item.newsTemplateId === page.page.messageType,
            }"
            @click="typeClcik(item.newsTemplateId)"
            v-for="(item, index) in newList"
            :key="index"
          >
            <div
              :class="{
                'arrow down': item.newsTemplateId == page.page.messageType,
              }"
            ></div>
            {{ item.newsTemplateTitle }}
            <div
              :class="{
                'arrow up': item.newsTemplateId == page.page.messageType,
              }"
            ></div>
          </div>
        </div>
        <div class="newsList">
          <div v-if="loading">{{ $en("alerts.loading") }}</div>
          <div v-else>
            <div class="no_data" v-if="lists?.length === 0">
              <img src="../../assets/user/emptyIcon.png" />
              <div>{{ $en("records.no_news") }}</div>
            </div>
            <div v-else>
              <div class="newsInfo" v-for="(item, index) in lists" :key="index">
                <img src="../../assets/user/bookMarkIcon.png" />
                <span>
                  <b>{{ item.title }} : </b>
                  <span>{{ item.content }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        style="margin-top: 20px"
        :page-size="page.page.pageSize"
        :current-page="page.page.pageNum"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userRecordgetMessageList, getJsonXq } from "@/api/galApi";
export default {
  name: "typeOfMoney",
  components: {},
  data() {
    return {
      loading: false,
      JsonList: {},
      currentIndex: 1,
      newList: [],
      total: 20,
      lists: [],
      page: {
        none: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          messageType: "",
        },
      },
    };
  },
  beforeMount() {
    this.getnewstype();
  },
  mounted() {},
  watch: {},
  methods: {
    handleCurrentChange(e) {
      this.pageNum = e;
      this.getnews();
    },
    typeClcik(e) {
      this.page.page.messageType = e;
      this.page.page.pageNum = 1;
      this.lists = [];
      this.getnews();
    },
    getnewstype() {
      this.JsonList = JSON.parse(localStorage.getItem("JsonList"));
      let index = 2;
      let url = this.JsonList.jsonUrl[index] + this.JsonList.newsTemplates;
      getJsonXq(url).then((res) => {
        this.newList = res.data.datas;
        this.page.page.pageNum = 1;
        this.lists = [];
        this.getnews();
      });
    },
    getnews() {
      this.loading = true;
      userRecordgetMessageList(this.page.page).then((res) => {
        if (res.code == 0) {
          this.loading = false;
          this.total = res.data.total;
          this.lists = this.lists.concat(res.data.rows);
          this.page.none = res.data.total == 0 ? true : false;
          if (!this.page.none) {
            this.lists.forEach((v) => {
              this.titles(v);
            });
          }
        }
      });
    },
    titles(v) {
      let data = this.newList;
      let length = Object.keys(data).length;
      for (let n = 1; n < length; n++) {
        if (v.newsTemplateId == data[n].newsTemplateId) {
          v.title = data[n].newsTemplateTitle;
          v.content = data[n].newsTemplateContent;
          let c = JSON.parse(v.newsContent);
          if (v.newsContent) {
            let vals = c.orderAmount
              ? c.orderAmount
              : c.dividendAmount
              ? c.dividendAmount
              : c.rebateAmount;
            if (vals.valueType == 0) {
              if (c.orderAmount) {
                v.content = v.content.replace(
                  /{orderAmount}/,
                  " " + vals.value + " "
                );
              } else if (c.rebateAmount) {
                v.content = v.content.replace(
                  /{rebateAmount}/,
                  " " + vals.value + " "
                );
              } else {
                v.content = v.content.replace(
                  /{dividendAmount}/,
                  " " + vals.value + " "
                );
              }
            }
            if (c.finishTime.valueType == 1) {
              v.content = v.content.replace(
                /{finishTime}/,
                this.timeType(c.finishTime.value, "yyyy-MM-dd")
              );
            } else if (c.finishTime.valueType == 2) {
              v.content = v.content.replace(
                /{finishTime}/,
                this.timeType(c.finishTime.value)
              );
            }
          }
          break;
        }
      }
    },
    timeType(num, day) {
      let date = new Date(num);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      if (day == "yyyy-MM-dd") {
        return y + "-" + MM + "-" + d;
      } else {
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.news_header {
  width: 800px;
  height: 47px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #bdc1c7;
  color: #304258;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 55px;
  .tab {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 10px;
    // padding-top: 10px;
  }
  .current_tab {
    border-bottom: 6px solid #9d2310;
  }
  .arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    position: relative;
  }
  .up {
    border-color: transparent transparent #9d2310 transparent;
  }

  .down {
    border-color: #9d2310 transparent transparent transparent;
  }
  .down,
  .up {
    border-width: 6px;
  }
}
.newsList {
  margin: 20px;
}
</style>

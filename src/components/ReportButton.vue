<template>
  <div class="report-button">
    <i class="el-icon-warning" @click="dialogVisible = true">举报</i>

    <el-dialog
      title="举报"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>被举报类型:{{reportType}}</div>
      <div>被举报id:{{reportedId}}</div>
      <div>被举报内容名称:{{reportedName}}</div>
      <el-input
        type="textarea"
        :rows="2"
        show-word-limit
        maxlength="40"
        placeholder="请输入举报理由"
        v-model="form.description">
      </el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import * as API from '../api/report'

    export default {
      name: "ReportButton",

      props:{
          reportType:'',
        reportedId:'',
        reportedName:'',
      },
      data(){
        return{
          dialogVisible: false,
          form:{
            report_type:this.reportType,
            reported_id:this.reportedId,
            description:'',
          }
        }
      },

      methods:{
        onSubmit() {
          API.postReport(this.form, this.$store.getters.getToken).then((res) => {
            if (res.status > 0) {
              this.$notify.error({
                title: '举报失败',
                message: res.msg,
              });
            } else {
              this.$notify({
                title: '举报成功',
                message: '感谢您的举报，我们之后将会处理',
                type: 'success',
              });
              this.dialogVisible = false;
            }
          }).catch((error) => {
            this.$notify.error({
              title: '网路错误，或者服务器宕机',
              message: error,
            });
          });
        },
      }
    }
</script>

<style scoped>
  .el-icon-warning:hover{
    cursor: pointer;
  }
</style>

<template>
  <div class="menage">
    <div>
      <el-button type="primary" @click="handleAdd">+ 新增</el-button>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%">
      <el-form 
      :inline="true" 
      ref="form" 
      :model="form" 
      label-width="80px"
      :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input  placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-mm-dd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input  placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="commonTab">
      <el-table
      height="600"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex===1 ? '男': '女'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="option"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" >删除</el-button>
      </template>
      </el-table-column>
      </el-table>
      <div class="papes">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          @current-change="handlePage">
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
import {getUser,addUser,delUser,editUser} from '../api'
export default {
    name:'User',
    data() {
      return {
        tableData: [],
        modalType:0,
        total:0,
        pageData:{
          page:1,
          limit:10
        },
        dialogVisible: false,
        form:{
          name:'',
          age:'',
          sex:'',
          birth:'',
          addr:''
        },
        rules:{
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          birth: [
            { required: true, message: '请选择出生日期', trigger: 'blur' },
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      submit(){
        this.$refs.form.validate((valid) => {
          // console.log(valid)
          if(valid){
            if(this.modalType === 0){
              addUser(this.form).then(() => {
                this.getList()
              })
            }else{
              editUser(this.form).then(() => {
                this.getList()
              })
            }
            this.$refs.form.resetFields()
            this.dialogVisible=false
          }
        })
      },
      handleClose(){
        // console.log(1)
        this.$refs.form.resetFields()
        this.dialogVisible=false
      },
      handleEdit(row){
        this.modalType = 1
        this.dialogVisible=true
        this.form = JSON.parse(JSON.stringify(row))
      },
      handleDelete(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id:row.id}).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleAdd(){
        this.dialogVisible = true
        this.modalType = 0
      },
      getList(){
        getUser({params:this.pageData}).then(({data}) => {
          this.tableData = data.list
          this.total = data.count || 0
        })
      },
      handlePage(val){
        console.log(val)
        this.pageData.page = val
        this.getList() 
      }
    },
    mounted(){
      this.getList()
    }
}
</script>

<style lang="less" scoped>
.menage {
  height: 90%;
    .commonTab {
        position: relative;
        height: calc(100% - 62px);
        .papes {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>
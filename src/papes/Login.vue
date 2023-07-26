<template>
    <el-card class="box-card">
        <el-form class="login_contaner" label-width="100px" :model="form" :rules="rules" ref="ruleForm">
        <h3 class="login_title">系统登陆</h3>
        <el-form-item label="用户名" prop="userName">
            <el-input placeholder="请输入用户名" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
            <el-input placeholder="请输入密码" v-model="form.passWord" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary">
                登录
            </el-button>
        </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
import Mock from 'mockjs'
import {getMenu} from '../api'
import Cookie from 'js-cookie'
export default {
    namr:'Login',
    data(){
        return {
            form:{
                userName:'',
                passWord:''
            },
            rules:{
                userName:[
                    {required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passWord:[
                    {required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submit(){
            // const token = Mock.Random.guid()
            // console.log(token)
            // //将token存入cookie
            // Cookie.set('token',token)
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    getMenu(this.form).then(({data}) => {
                        console.log(data)
                        if(data.code === 20000){
                            Cookie.set('token',data.data.token)
                            // 获取菜单数据
                            this.$store.commit('SETMENU',data.data.menu)
                            // this.$store.commit('ADDMENU',this.$router)
                            // console.log(this.$store)
                            this.$router.push('/Home')
                        }else{
                            this.$message.error('密码或用户名错误');
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
    .box-card{
        width: 400px;
        margin: 180px auto;
        .login_title{
            text-align: center;
            font-weight: 400;
            margin-bottom: 40px;
            color: #045458
        };
        .el-input{
            width: 200px;
        };
        .el-button{
            margin-left: 40px;
        }
    }
</style>
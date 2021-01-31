<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
        >
            <div class="title-container">
                <h2 class="title">教 学 管 理 系 统</h2>
            </div>
            <el-form-item prop="teacherId">
                <span class="svg-container">
                    <i class="iconfont">&#xe611;</i>
                </span>
                <el-input
                    v-model="loginForm.teacherId"
                    name="teacherId"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                    placeholder="登录账户"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont">&#xe60e;</i>
                </span>
                <el-input
                    v-model="loginForm.password"
                    :type="passwordType"
                    name="password"
                    auto-complete="on"
                    tabindex="2"
                    show-password
                    placeholder="登录密码"
                />
            </el-form-item>

            <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-top: 20px"
                @click="handleLogin"
                >登录</el-button
            >
        </el-form>
    </div>
</template>

<script>
import { Login } from "@/api/api";
import { setLocalStorage } from "@/utils/local-storage";

export default {
    name: "Login",
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error("密码长度应大于6位"));
            } else {
                callback();
            }
        };

        return {
            loginForm: {
                teacherId: "",
                password: "",
            },
            loginRules: {
                teacherId: [
                    {
                        required: true,
                        message: "账号不允许为空",
                        trigger: "blur",
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不允许为空",
                        trigger: "blur",
                    },
                    { validator: validatePassword, trigger: "blur" },
                ],
            },
            passwordType: "password",
            loading: false,
        };
    },
    watch: {},

    methods: {
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid && !this.loading) {
                    Login(this.loginForm).then((res) => {
						console.log(res);
						if (res.data.code == "200") {
							this.loading = true;
							setLocalStorage({
								Authorization: res.data.data.token,
								role: res.data.data.role,
								teacherId: res.data.data.teacherId
							});
							this.$router.push({ path: "/" });
						}
					}).catch((err) => {});
                } else {
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 120px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 5px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 35px;
            color: $light_gray;
            margin: 0px auto 60px auto;
            text-align: center;
            font-weight: bold;
        }
    }
    .copyright {
        font-size: 12px;
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-bottom: 20px;
        letter-spacing: 0.6px;
        a {
            font-weight: bold;
            border-bottom: 1px solid #fff;
            font-family: "PingFangSC-Semibold", sans-serif;
        }
    }
}
</style>


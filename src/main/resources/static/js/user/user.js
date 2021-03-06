let isAuth = false;
let isEmail = false;
let isPassword = false;
let isConfirmPassword = false;
let isValidDate = false;
let isName = false;
const user = {
    init: function () {
        const _this = this;

        $('#email').on('keyup', function () {
            _this.emailValidate();
        });

        $('#password').on('keyup', function () {
            _this.passwordValidate();
        });

        $('#password-confirm').on('keyup', function () {
            _this.passwordEqual();
        });

        $('#birth-day').on('change', function () {
            _this.birthValidate();
        });
        $('#birth-month').on('change', function () {
            _this.birthValidate();
        });
        $('#birth-year').on('focus', function () {
            _this.birthValidate();
        });

        $('#name').on('blur', function () {
            _this.nameValidate();
        })

        $('#btn-email-valid').on('click', function () {
            _this.emailValid();
        });

        /*$('#password-reset').on('click', function () {
            $('#password').attr('readonly', false);
            $('#password').val('');
            $('#password-confirm').val('');
            $('#password-warn').css('display', 'block');
            $('#password-confirm-good').css('display', 'none');
            $('#btn-user-save').attr('disabled', true);
            $('#password-warning').css('display', 'block');
            $('#password-length-warning').css('display', 'block');
            $('#password-good').css('display', 'none');
        });*/

        $('#btn-user-delete').on('click', function () {
            const userEmail = $('#email').val();
            const userInputEmail = prompt('정말로 삭제하시겠습니까? 삭제하시려면 이메일을 다시 입력하십시오.');
            if (userEmail === userInputEmail) {
                _this.deleteUser();
            }
        });

        $('#btn-user-save').on('click', function(e) {
            if((isConfirmPassword && isEmail && isName && isPassword && isValidDate) !== true) {
                if(!isEmail) {
                    _this.emailValidate();
                    $('#email').focus();
                } else if(!isPassword) {
                    _this.passwordValidate();
                    $('#password').focus();
                } else if(!isConfirmPassword) {
                    _this.passwordEqual();
                    $('#password-confirm').focus();
                } else if(!isName){
                    _this.nameValidate();
                    $('#name').focus();
                }else if(!isValidDate) {
                    _this.birthValidate();
                    $('#birth-year').focus();
                }
                alert('작성 항목을 다시 검토하세요.');
                e.preventDefault();
                return;
            }
            if(!isAuth) {
                alert('이메일 인증을 먼저 진행하세요.')
                e.preventDefault();
            }
            if(!confirm('가입하시겠습니까?')) {
                e.preventDefault();
                alert('가입이 완료되었습니다.');
            }
        })
    }
    ,
    passwordEqual: function () {
        const myPassword = $('#password').val();
        const confirmPassword = $('#password-confirm').val();
        if (myPassword !== confirmPassword) {
            $('#password-warn').css('display', 'block');
            $('#password-confirm-good').css('display', 'none');
            isConfirmPassword = false;
        } else {
            $('#password-warn').css('display', 'none');
            $('#password-confirm-good').css('display', 'block');
            //$('#password').attr('readonly', true);
            isConfirmPassword = true;
        }
    },
    passwordValidate: function () {
        const password = $('#password').val();

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        let isGoodPattern;
        let isGoodLength;

        if (passwordPattern.test(password)) {
            $('#password-warning').css('display', 'none');
            isGoodPattern = true;
        } else {
            $('#password-warning').css('display', 'block');
            isGoodPattern = false;
        }
        if (password.length < 9 || password.length > 13) {
            $('#password-length-warning').css('display', 'block');
            isGoodLength = false;
        } else {
            $('#password-length-warning').css('display', 'none');
            isGoodLength = true;
        }

        if (isGoodLength && isGoodPattern) {
            $('#password-good').css('display', 'block');
            isPassword = true;
        } else {
            $('#password-good').css('display', 'none');
            isPassword = false;
        }

    },
    birthValidate: function () {
        const birthYear = $('#birth-year option:selected').val();
        const birthMonth = $('#birth-month option:selected').val();
        const birthDay = $('#birth-day option:selected').val();
        if (birthYear === 'none' || birthMonth === 'none' || birthDay === 'none') {
            $('#birth-warn').css('display', 'block');
            $('#birth-good').css('display', 'none');
            isValidDate = false;
        } else {
            $('#birth-warn').css('display', 'none');
            $('#birth-good').css('display', 'block');
            let strBirthDay = birthDay
            let strBirthMonth = birthMonth
            if (parseInt(birthDay) < 10) {
                strBirthDay = '0' + birthDay;
            }
            if (parseInt(birthMonth) < 10) {
                strBirthMonth = '0' + birthMonth;
            }

            $('#birth').val(birthYear + '' + strBirthMonth + '' + strBirthDay);
            isValidDate = true;
        }
    },

    emailValidate: function () {
        const email = $('#email').val();
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!emailRegex.test(email)) {
            $('#email-warning').css('display', 'block');
            $('#email-good').css('display', 'none');
            isEmail = false;
        } else {
            $('#email-warning').css('display', 'none');
            $('#email-good').css('display', 'block');
            isEmail = true;
        }
    },
    emailValid: function () {
        const data = $('#email').val();


        $.ajax({
            url: '/emailValid',
            method: 'POST',
            data: data,
            dataType: 'text',
            contentType: 'text/plain; charset=utf-8',
            success: function(data) {
                if (data === 'valid') {
                    alert('사용 가능한 이메일 입니다.');
                    $('#btn-email-valid').attr('disabled', true);
                    $('#email-valid').css('display', 'block');
                    isAuth = true;
                } else {
                    alert('이미 가입된 이메일 입니다.');
                    $('#email').focus();
                }
            }
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    },
    nameValidate: function () {
        const nameValue = $('#name').val();
        if (nameValue.length <= 1) {
            $('#name-warning').css('display', 'block');
            $('#name-good').css('display', 'none');
            isName = false;
        } else {
            $('#name-warning').css('display', 'none');
            $('#name-good').css('display', 'block');
            isName = true;
        }
    },
    deleteUser: function () {
        const userId = $('#userId').val();

        $.ajax({
            url: '/api/v1/user/' + userId,
            method: 'DELETE',
            contentType: 'application/json; charset=utf-8',
        }).done(function () {
            alert('계정 삭제 완료');
            window.location.href = '/logout';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    }
}

user.init();
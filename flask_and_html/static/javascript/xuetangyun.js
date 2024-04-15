/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-SA
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

"use strict";
(self["webpackChunkprofession_vue"] = self["webpackChunkprofession_vue"] || []).push([[95271], {

    /***/ 295073:
    /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(685569);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(286226);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(271426);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_index_of__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(964007);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_index_of__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_index_of__WEBPACK_IMPORTED_MODULE_3__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(750697);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_4__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(56255);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_5__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(911393);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6__);
        /* harmony import */
        var _uEditor_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(296898);
        /* harmony import */
        var _components_uploadAttachment_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(960235);
        /* harmony import */
        var _components_uploadAttachment_guangcai_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(437250);
        /* harmony import */
        var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(795093);
        /* harmony import */
        var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
        /* harmony import */
        var _common_annotation_annotation_mixin__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(980465);
        /* harmony import */
        var _common_annotation_annotation_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(989943);
        /* harmony import */
        var _util_encryptedFont__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(750975);
        /* provided dependency */
        var $ = __webpack_require__(74684);


//import SyntaxHighlighter from '@/util/SyntaxHighlighter/shCore.js'


        moment__WEBPACK_IMPORTED_MODULE_10___default().locale('zh-cn');
        //批注
// 批注弹层


        var vm = null;
        /* harmony default export */
        __webpack_exports__.A = ({
            data: function data() {
                return {
                    submitProblemsClickHandlerDialog: {
                        visible: false,
                        data: {}
                    },
                    submitProblemsCheckDialog: {
                        visible: false,
                        data: {}
                    },
                    // 提交按钮跟据有无内容可不可点
                    submitStatus: false,
                    reg: /<span class="blank-item".*?>.+?\d]<\/span>/gi,
                    editorConfig: {
                        toolbars: [['bold', 'italic', 'underline', 'insertimage', 'kityformula', 'insertcode', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist']
                            // ,
                            // ['undo', 'redo', '|', 'paragraph', 'forecolor', 'bold', 'italic', 'insertunorderedlist', 'fontsize', 'formatmatch', '|', 'justifyright', 'justifycenter', 'justifyjustify', '|', 'link', 'insertvideo', 'insertcode',
                            //     'insertimage', 'kityformula'
                            // ]
                        ],
                        maximumWords: 20000 //允许的最大字符数
                    },
                    // 批注列表
                    annotations: [],
                    // 展示的批注
                    anno: null,
                    // 显示批注吗
                    visibleAnno: false
                };
            },
            filters: {
                formatScoreDeadline: function formatScoreDeadline(val) {
                    return moment__WEBPACK_IMPORTED_MODULE_10___default()(val).format('YYYY-MM-DD/HH:mm/dddd');
                }
            },
            props: ['leafinfo', 'exerciseList', 'userInfo', 'defaultProblem', 'setDefaultProblem', 'defaultProblemStatus', 'submitProblemNext', 'sku_id'],
            components: {
                uploadAttachment: _components_uploadAttachment_vue__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */.A,
                uploadAttachmentGuangcai: _components_uploadAttachment_guangcai_vue__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */.A,
                Ueditor: _uEditor_index__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.A,
                annotationCmp: _common_annotation_annotation_vue__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */.A
            },
            mixins: [_common_annotation_annotation_mixin__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */.A],
            created: function created() {
                vm = this;
                this.formatData(this.defaultProblem);
                console.log(this.defaultProblemStatus);
            },
            mounted: function mounted() {
                this.$nextTick(function () {
                    if ('MathJax' in window) window.MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                    //SyntaxHighlighter.highlight();
                });
            },
            watch: {
                defaultProblem: {
                    handler: function handler(v1, v2) {
                        this.formatData(v1);
                    },
                    immediate: true,
                    deep: true
                }
            },
            methods: {
                submitProblemClickHandler: function submitProblemClickHandler() {
                    // 检查填空题
                    // if (/4/gi.test(this.defaultProblem.content.problem_type)) {
                    //     let s = !!0
                    //     this.defaultProblem._answers.forEach(function(v,i){
                    //         if (v.num && v.answer ==  '') {
                    //             s = !!1
                    //         }
                    //     })
                    //     if (s) {
                    //        this.submitProblemsClickHandlerDialog.visible = !!1
                    //         return;
                    //     }
                    // }

                    this.$emit('submitProblem', this.defaultProblem);
                },
                submitProgrammingProblem: function submitProgrammingProblem() {
                    this.$emit('getProgramme', true, 'topic_describe');
                },
                submissionRecord: function submissionRecord() {
                    this.$emit('getProgramme', true, 'submit_record');
                },
                setDefaultCacheData: function setDefaultCacheData() {
                    // 设置浏览器缓存
                    var _key = this.$route.fullPath.replace(/^\//gi, '').replace(/\//gi, '-') + '-' + this.userInfo.user_id,
                        _cacheData = localStorage.getItem(_key) ? JSON.parse(localStorage.getItem(_key)) : {
                            problems: {}
                        };
                    _cacheData.problems[this.defaultProblem.problem_id] = this.defaultProblem;
                    localStorage.setItem(_key, _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(_cacheData));
                },
                getDefaultCacheData: function getDefaultCacheData(defaultData, type, type_detail_index) {
                    // 获取浏览器缓存
                    var _key = this.$route.fullPath.replace(/^\//gi, '').replace(/\//gi, '-') + '-' + this.userInfo.user_id,
                        _cacheData = localStorage.getItem(_key) ? JSON.parse(localStorage.getItem(_key)) : {
                            problems: {}
                        };
                    if (!localStorage.getItem(_key)) {
                        return defaultData;
                    }
                    _cacheData = JSON.parse(localStorage.getItem(_key));
                    if (_cacheData.problems[this.defaultProblem.problem_id]) {
                        if (/4/gi.test(this.defaultProblem.content.ProblemType)) {
                            if (_cacheData.problems[this.defaultProblem.problem_id]['_answers'] && _cacheData.problems[this.defaultProblem.problem_id]['_answers'][type_detail_index] && 'answer' in _cacheData.problems[this.defaultProblem.problem_id]['_answers'][type_detail_index]) {
                                return _cacheData.problems[this.defaultProblem.problem_id]['_answers'][type_detail_index]['answer'];
                            } else {
                                return '';
                            }
                        }
                        if (/2|5|1|6|3|9/gi.test(this.defaultProblem.content.ProblemType)) {
                            return _cacheData.problems[this.defaultProblem.problem_id]['_answer'];
                        }
                    }
                    return defaultData;
                },
                refreshSubmitStatus: function refreshSubmitStatus(type) {
                    var _defaultProblem = this.defaultProblem,
                        _submitStatus = false;
                    // console.log('refreshSubmitStatus', type)

                    // 填空
                    if (/4/gi.test(_defaultProblem.content.ProblemType)) {
                        var _context;
                        // console.log('refreshSubmitStatus',_defaultProblem, _defaultProblem.content.ProblemType, _defaultProblem._answers);
                        _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_1___default()(_context = _defaultProblem._answers).call(_context, function (v, i) {
                            if (v.num && v.answer && v.answer.length) {
                                _submitStatus = true;
                            }
                        });
                    }
                    // 多选|投票
                    if (/2|3/gi.test(_defaultProblem.content.ProblemType)) {
                        if (_defaultProblem._answer && _defaultProblem._answer.length) {
                            _submitStatus = true;
                        }
                    }
                    // 单选|判断
                    if (/1|6/gi.test(_defaultProblem.content.ProblemType)) {
                        if (_defaultProblem._answer.toString() && _defaultProblem._answer.toString().length) {
                            _submitStatus = true;
                        }
                    }
                    // 主观题
                    if (/5/gi.test(_defaultProblem.content.ProblemType)) {
                        // 内容不为空
                        console.log(_defaultProblem._answer.content);
                        if (_defaultProblem._answer.content.toString() && _defaultProblem._answer.content.toString().length) {
                            _submitStatus = true;
                        }
                        // 或附件不为空
                        if (_defaultProblem._answer.oSubject.attachments.filelist && _defaultProblem._answer.oSubject.attachments.filelist.length) {
                            _submitStatus = true;
                        }
                    }

                    // 逻辑与html逻辑统一
                    var _defaultProblemStatus = this.defaultProblemStatus;
                    if (_defaultProblemStatus.isreply_info.leafinfoScoreDeadline) {
                        if (!_defaultProblemStatus.isreply_info.nolimit && !_defaultProblemStatus.isreply_info.limit_count) {
                            _submitStatus = false;
                        }
                    } else {
                        _submitStatus = false;
                    }
                    _defaultProblem._submitStatus = _submitStatus;
                    _defaultProblem._changeStatus = type && /^formatData$/gi.test(type) ? false : true;
                    this.submitStatus = _submitStatus;
                    // this.defaultProblem.user.is_right=null
                    this.setDefaultCacheData();
                },
                inputChangeHandler: function inputChangeHandler(evt) {
                    this.$forceUpdate();
                },
                changeToupiao: function changeToupiao(val) {
                    //选中投票题
                    if (this.defaultProblem._answer.length == 1 || this.defaultProblem._answer.length <= this.defaultProblem.content.PollingCount) {
                        //正常
                    } else {
                        //删除第一个值
                        this.defaultProblem._answer.shift();
                    }
                    this.$forceUpdate();
                },
                shortAnswerUpload: function shortAnswerUpload(e, ee) {
                    this.$forceUpdate();
                    this.refreshSubmitStatus();
                },
                problem_remark_more: function problem_remark_more(e) {
                    var _more = $(e.srcElement || e.target);
                    if (!/problem\-remark\-\-more/gi.test(_more.attr('class'))) {
                        _more = _more.parents('.problem-remark--more');
                    }
                    var _icon = _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2___default()(_more).call(_more, 'span.more-icon'),
                        _box = $(_more).parents('.problem-remark'),
                        _con = _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2___default()(_box).call(_box, '.problem-remark--content'),
                        _className = _icon.attr('class'),
                        _text = _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2___default()(_more).call(_more, '.more-text');
                    if (/el\-icon\-arrow\-down/gi.test(_className)) {
                        _con.show();
                        _icon.attr('class', 'more-icon el-icon-arrow-up');
                        _text.text('收起解析');
                    } else {
                        _con.hide();
                        _icon.attr('class', 'more-icon el-icon-arrow-down');
                        _text.text('查看解析');
                    }
                },
                //公式图片转成公式显示
                changeBase64ToLatex: function changeBase64ToLatex(text) {
                    var _html = text;
                    try {
                        if (typeof _html === 'string' && _html) {
                            _html = (0, _util_encryptedFont__WEBPACK_IMPORTED_MODULE_13__/* .encryptedFontFormatHtml */.K)(_html);
                            //下面formatHtml已经处理了链接替换，不再重复
                            var reg = /http:\/\/([a-z|A-Z|0-9]+)\.ykt\.io\/([a-z|A-Z|0-9]+)/g;
                            _html = _html.replace(reg, 'https://qn-$1.yuketang.cn/$2');
                            var $html = $('<div>' + _html + '</div>');
                            var imgs = _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2___default()($html).call($html, 'img.kfformula');
                            if (imgs.length > 0) {
                                for (var i = 0; i < imgs.length; i++) {
                                    var $item = $(imgs[i]);
                                    var display = $item.attr('data-display');
                                    var latex = $item.attr('data-latex');
                                    //console.log('latex',latex)
                                    //    latex = display === 'block' ? '$$' + latex + '$$' : '$' + latex + '$';
                                    latex = display === 'block' ? '[mathjax]' + latex + '[/mathjax]' : '[mathjaxinline]' + latex + '[/mathjaxinline]';
                                    var _style = $item.attr('style');
                                    //$item.replaceWith('111');
                                    $item.replaceWith('<span class="kfformula-latex" style="position:relative;display:' + display + ';padding:0 10px;' + _style + '">' + latex + '</span>');
                                }
                            }
                            this.$nextTick(function () {
                                if ('MathJax' in window) window.MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                                //SyntaxHighlighter.highlight();
                            });
                            return $html.html();
                        }
                    } catch (e) {
                    }
                    return _html;
                },
                formatHtml: function formatHtml(v) {
                    var _html = v;
                    try {
                        if (typeof _html === 'string' && _html) {
                            _html = _html.replace(/http:\/\/([a-z|A-Z|0-9]+)\.ykt\.io\/([a-z|A-Z|0-9]+)/g, 'https://qn-$1.yuketang.cn/$2').replace(/<link.+?>/gi, '').replace(/<img.+?\/>/gi, function (vv) {
                                var _vv;
                                if (/style=""/gi.test(vv)) {
                                    console.log(vv);
                                    _vv = vv.replace('style=""', 'style="max-width: 80%" preview="' + new Date().valueOf() + '"');
                                } else {
                                    _vv = vv.replace('<img', '<img style="max-width: 80%" preview="' + new Date().valueOf() + '"');
                                }
                                return _vv;
                            });
                            _html = this.changeBase64ToLatex(_html);
                        }
                    } catch (e) {
                    }
                    this.$nextTick(function () {
                        if ('MathJax' in window) window.MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                        //SyntaxHighlighter.highlight();
                    });
                    return _html;
                },
                formatData: function formatData(v) {
                    var _this2 = this;
                    var _this = this,
                        _reg = /<span class="blank-item".*?>.+?\d]<\/span>/gi,
                        _num = 0;

                    // 主观题
                    if (/^5$/gi.test(v.content.ProblemType)) {
                        if (!v._answer) {
                            // v._answer = v.user.my_answer && v.user.my_answer.length ? v.user.my_answer[0]:'';
                            v._answer = v.user.my_answer ? v.user.my_answer : _this.getDefaultCacheData({
                                content: '',
                                time: '0',
                                oSubject: {
                                    attachments: {
                                        filelist: []
                                    }
                                }
                            });
                        }
                    }
                    // 单选|判断
                    if (/^1|6$/gi.test(v.content.ProblemType)) {
                        if (!v._answer) {
                            var _context2;
                            if (_babel_runtime_corejs3_core_js_stable_instance_index_of__WEBPACK_IMPORTED_MODULE_3___default()(_context2 = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_4___default()(v.user)).call(_context2, 'my_answer') >= 0 && v.user.my_answer.length) {
                                v._answer = v.user.my_answer[0];
                                v._isAnswer = !!1;
                            } else {
                                v._answer = _this.getDefaultCacheData('');
                                v._isAnswer = !!0;
                            }
                        }
                    }
                    // 多选
                    if (/^2$/gi.test(v.content.ProblemType)) {
                        if (!v._answer) {
                            var _context3;
                            if (_babel_runtime_corejs3_core_js_stable_instance_index_of__WEBPACK_IMPORTED_MODULE_3___default()(_context3 = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_4___default()(v.user)).call(_context3, 'my_answers') >= 0) {
                                var _context4;
                                v._answer = [];
                                _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_1___default()(_context4 = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_4___default()(v.user.my_answers)).call(_context4, function (vv, ii) {
                                    v._answer.push(vv);
                                });
                                // v._answer = v.user.answer.split('');
                                v._isAnswer = !!1;
                            } else {
                                v._answer = _this.getDefaultCacheData([]);
                                v._isAnswer = !!0;
                            }
                        }
                    }
                    // 投票
                    if (/^3$/gi.test(v.content.ProblemType)) {
                        if (!v._answer) {
                            var _context5;
                            if (_babel_runtime_corejs3_core_js_stable_instance_index_of__WEBPACK_IMPORTED_MODULE_3___default()(_context5 = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_4___default()(v.user)).call(_context5, 'my_answer') >= 0) {
                                v._answer = v.user.my_answer;
                                v._isAnswer = !!1;
                            } else {
                                v._answer = _this.getDefaultCacheData([]);
                                v._isAnswer = !!0;
                            }
                        }
                    }
                    // 填空题
                    if (/^4$/gi.test(v.content.ProblemType)) {
                        if (!v.content._Body || v.user._refresh) {
                            var _context6;
                            v.content._Body = v.content.Body.replace(/<p>/gi, '').replace(/<\/p>/gi, '').replace(_reg, function (v) {
                                return ['__blank-item__', v, '__blank-item__'].join('');
                            }).split('__blank-item__');
                            // v._is_right = [];

                            v._answers = [];
                            _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_1___default()(_context6 = v.content._Body).call(_context6, function (vv, i) {
                                var _answer = {};
                                if (_reg.test(vv)) {
                                    _answer.num = ++_num;
                                    if (v.user.my_answers) {
                                        if (v.user.my_answers[_answer.num]) {
                                            _answer.answer = v.user.my_answers[_answer.num]['answer'];
                                            _answer.is_right = v.user.my_answers[_answer.num]['is_right'];
                                        }
                                        // v._is_right.push(_answer.is_right)
                                    } else {
                                        _answer.answer = _this.getDefaultCacheData('', 'ShortAnswer', i);
                                        console.log(_answer, i);
                                    }
                                }
                                v._answers.push(_answer);
                            });
                            v._refresh = false;
                        }
                    }
                    // 编程OJ题
                    if (/^9/gi.test(v.content.ProblemType)) {
                        if (!v._answer) {
                            var _v$content = v.content,
                                language = _v$content.language,
                                _v$content$code = _v$content.code,
                                code = _v$content$code === void 0 ? '' : _v$content$code;
                            v._answer = _this.getDefaultCacheData({
                                code: '',
                                language: ''
                            });
                        }
                    }
                    this.$forceUpdate();
                    this.refreshSubmitStatus('formatData');
                    _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_5___default()(function () {
                        _this2.initEvent(); //批注
                    }, 100);
                },
                triggerUploadAttachment: function triggerUploadAttachment(item) {
                    if (item.attachments.filelist.length === 1) return;
                    var node = document.getElementById('upload' + this.defaultProblem.problem_id);
                    node.click();
                },
                _setDefaultProblem: function _setDefaultProblem(index) {
                    console.log('_setDefaultProblem', index, this.defaultProblem);
                    var that = this;
                    // if (this.defaultProblem._submitStatus && this.defaultProblem.user.my_count == 0) {
                    //     that.submitProblemsCheckDialog.visible = true;
                    //     that.submitProblemsCheckDialog.data.index = index;
                    //     return;
                    // }
                    this.$emit('setDefaultProblem', this.exerciseList.problems[index]);
                },
                editorBlur: function editorBlur() {
                },
                editorChange: function editorChange(data, text) {
                    console.log(22222, text);
                    this.defaultProblem._answer.content = text;
                    this.refreshSubmitStatus();
                    this.$forceUpdate();
                    // if (text && text.length) {
                    //     this.refreshSubmitStatus()
                    // }
                },
                //跳转评测详情
                toSubmissionDetail: function toSubmissionDetail(submissionId, title) {
                    var routeData = this.$router.resolve({
                        name: 'ojSubDetail',
                        params: {
                            classroom_id: this.$route.params.classroom_id
                        },
                        query: {
                            sku_id: this.sku_id,
                            submission_id: submissionId,
                            title: title
                        }
                    });
                    window.open(routeData.href, '_blank');
                },
                previewPics: function previewPics(file, item) {
                    if (this.findAnno && file.fileUrl && item.annotations) {
                        this.annotations = item.annotations;
                        var has = this.findAnno(file.fileUrl);
                        if (has) {
                            this.viewAnno(file.fileUrl);
                            return this;
                        }
                    }
                    var msg = "<img src='".concat(file.fileUrl, "' />");
                    this.$alert(msg, {
                        dangerouslyUseHTMLString: true,
                        customClass: 'imageDialog',
                        showClose: false,
                        showConfirmButton: false,
                        closeOnClickModal: true
                    }).then(function () {
                    })["catch"](function () {
                    });
                },
                checkAnno: function checkAnno(file, item) {
                    if (this.findAnno && file.fileUrl && item.annotations) {
                        this.annotations = item.annotations;
                        var has = this.findAnno(file.fileUrl);
                        if (has) {
                            this.viewAnno(file.fileUrl);
                            return this;
                        }
                    }
                },
                // pdf 查看批注跳新页面
                handleAttachmentAnno: function handleAttachmentAnno(file) {
                    if (typeof file.pdf_annotation_id === 'number' && file.pdf_annotation_id !== -1) {
                        var _context7, _context8;
                        var URL = false ? 0 : _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default()(_context8 = "/subject/pdf-anno-preview/".concat(encodeURIComponent(file.fileUrl), "/")).call(_context8, file.pdf_annotation_id);
                        window.open(URL, '_blank');
                    }
                }
            }
        });

        /***/
    }),

    /***/ 886826:
    /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56255);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(685569);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(911265);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(814607);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_3__);
        /* harmony import */
        var _programme_nav_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(228160);
        /* harmony import */
        var _programme_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(510142);
        /* harmony import */
        var _components_codeMirror_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(462498);
        /* harmony import */
        var _my_mixins__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(213934);


        /* harmony default export */
        __webpack_exports__.A = ({
            data: function data() {
                return {
                    language: "",
                    //默认语言
                    languages: [],
                    //可选语言
                    code: "",
                    title: "",
                    problemDescibe: null,
                    theme: "solarized",
                    //默认主题
                    submission_id: "",
                    eval_result: "",
                    //最新评测结果
                    isFullEdit: true,
                    //
                    pollingTimer: null //轮询结果定时器
                };
            },
            components: {
                programmeNav: _programme_nav_vue__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.A,
                programmeTab: _programme_tab__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.A,
                codeMirror: _components_codeMirror_index__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */.A
            },
            computed: {
                bg_eval: function bg_eval() {
                    return this.addCssColor(this.eval_result);
                }
            },
            mixins: [_my_mixins__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.A],
            props: ["status", "problem_id", "sku_id", "defaultProblem", "defaultProblemStatus", "userInfo"],
            created: function created() {
            },
            mounted: function mounted() {
                var _this = this;
                var _this$defaultProblem = this.defaultProblem,
                    content = _this$defaultProblem.content,
                    _this$defaultProblem$ = _this$defaultProblem._answer,
                    _answer = _this$defaultProblem$ === void 0 ? {} : _this$defaultProblem$;
                var code = _answer.code,
                    language = _answer.language; //缓存里取下
                var selected_languages = content.selected_languages,
                    languages = content.languages,
                    title = content.title;
                this.languages = selected_languages || languages;
                this.language = language || this.languages && this.languages[0];
                this.title = title;
                _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_0___default()(function () {
                    _this.problemDescibe = _this.$refs.programmeTab && _this.$refs.programmeTab.problemDescibe;
                    if (_this.problemDescibe) {
                        _this.code = code || '';
                    }
                }, 500);
            },
            watch: {
                code: function code(cur, old) {
                    if (this.defaultProblem._answer) {
                        this.defaultProblem._answer.code = cur;
                        this.defaultProblem._answer.language = this.language;
                        this.setDefaultCacheData();
                    }
                },
                language: function language(cur, old) {
                    if (cur) {
                        if (this.defaultProblem._answer) {
                            this.defaultProblem._answer.code = this.code;
                            this.defaultProblem._answer.language = cur;
                            this.setDefaultCacheData();
                        }
                    }
                }
            },
            methods: {
                setDefaultCacheData: function setDefaultCacheData() {
                    // 设置浏览器缓存
                    var _key = this.$route.fullPath.replace(/^\//gi, '').replace(/\//gi, '-') + '-' + this.userInfo.user_id,
                        _cacheData = localStorage.getItem(_key) ? JSON.parse(localStorage.getItem(_key)) : {
                            problems: {}
                        };
                    _cacheData.problems[this.defaultProblem.problem_id] = this.defaultProblem;
                    localStorage.setItem(_key, _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()(_cacheData));
                },
                //重置代码
                onResetToTemplate: function onResetToTemplate() {
                    var _this2 = this;
                    this.$confirm("确定重置代码吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "info"
                    }).then(function () {
                        var template = _this2.problemDescibe.template;
                        if (template && template[_this2.language]) {
                            _this2.code = template[_this2.language];
                        } else {
                            _this2.code = "";
                        }
                    });
                },
                //改变语言，模板更换
                changeLang: function changeLang(newLang) {
                    this.problemDescibe = this.$refs.programmeTab && this.$refs.programmeTab.problemDescibe;
                    if (this.problemDescibe && this.problemDescibe.template[newLang]) {
                        this.code = this.problemDescibe.template[newLang];
                    } else {
                        this.code = "";
                    }
                    this.language = newLang;
                },
                //更改主题
                onChangeTheme: function onChangeTheme(newTheme) {
                    this.theme = newTheme;
                },
                //获取最新评测结果
                getEvalStatus: function getEvalStatus() {
                    var _this3 = this;
                    var params = {
                        classroom_id: this.$route.params.classroom_id,
                        sku_id: this.sku_id,
                        submission_id: this.submission_id
                    };
                    request.get(API.studentExercise.submission, params).then(function (res) {
                        if (res.data.success) {
                            _this3.eval_result = res.data && res.data.data.result;
                        } else {
                            //其他异常都toast提示
                            _this3.$message({
                                message: res.data.msg,
                                type: "warn"
                            });
                        }
                    })["catch"](function (err) {
                        _this3.$message({
                            message: err.msg,
                            type: "warn"
                        });
                    });
                },
                //提交
                submitCode: function submitCode() {
                    var _context,
                        _this4 = this;
                    if (_babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_2___default()(_context = this.code).call(_context) !== "") {
                        var params = {
                            problem_id: this.problem_id,
                            sku_id: this.sku_id,
                            classroom_id: this.$route.params.classroom_id,
                            language: this.language,
                            code: this.code
                        };
                        clearInterval(this.pollingTimer);
                        request.post(API.studentExercise.submission, params).then(function (res) {
                            if (res.data.success) {
                                _this4.$message({
                                    message: "提交成功",
                                    type: "success"
                                });
                                _this4.submission_id = res.data && res.data.data && res.data.data.data && res.data.data.data.submission_id;
                                var _ref = res.data && res.data.data && res.data.data,
                                    my_score = _ref.my_score,
                                    my_count = _ref.my_count;
                                _this4.$emit('changeProgrameStatus', {
                                    my_score: my_score,
                                    my_count: my_count
                                });
                                _this4.getPollEvalResult();
                                _this4.pollingTimer = _babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_3___default()(function () {
                                    _this4.getPollEvalResult();
                                }, 5000);
                                _this4.$refs.programmeTab.get_submit_list();
                                //this.code = this.problemDescibe.template[this.language] || '';
                                _this4.$emit('getExerciseList', _this4.defaultProblem.index);
                                //} else if (res.data.error_code === 20007) {//
                            } else {
                                //其他异常都toast提示
                                _this4.$message({
                                    message: res.data.msg,
                                    type: "warn"
                                });
                            }
                        })["catch"](function (err) {
                            // if(err.error_code === 20007) {
                            _this4.$message({
                                message: err.msg,
                                type: "warn"
                            });
                            // }
                        });
                    }
                },
                //轮询最新评测结果
                getPollEvalResult: function getPollEvalResult() {
                    var _this5 = this;
                    var params = {
                        classroom_id: this.$route.params.classroom_id,
                        sku_id: this.sku_id,
                        submission_id: this.submission_id
                    };
                    request.get(API.studentExercise.submission, params).then(function (res) {
                        if (res.data.success) {
                            var _data = res.data.data.data;
                            if (_data.result != 6 && _data.result != 7) {
                                //6 7表示进行中 拿到结果后可取消定时器
                                clearInterval(_this5.pollingTimer);
                                _this5.$refs.programmeTab.get_submit_list();
                                _this5.$emit('getExerciseList', _this5.defaultProblem.index);
                            }
                            _this5.eval_result = _data.result;
                        }
                    });
                },
                //未提交时获取列表最新评测结果
                getEvalRessult: function getEvalRessult(eval_result, submission_id) {
                    this.eval_result = eval_result;
                    this.submission_id = submission_id;
                },
                changeFullEdit: function changeFullEdit() {
                    this.isFullEdit = !this.isFullEdit;
                },
                //跳转评测详情
                toEvalDetail: function toEvalDetail() {
                    var routeData = this.$router.resolve({
                        name: "ojSubDetail",
                        params: {
                            classroom_id: this.$route.params.classroom_id
                        },
                        query: {
                            sku_id: this.sku_id,
                            submission_id: this.submission_id,
                            title: this.title
                        }
                    });
                    window.open(routeData.href, "_blank");
                }
            }
        });

        /***/
    }),

    /***/ 243533:
    /***/ (function (__unused_webpack_module, __webpack_exports__) {

        /* harmony default export */
        __webpack_exports__.A = ({
            data: function data() {
                return {
                    str: ""
                };
            },
            props: {},
            inject: ["changeProgrammeShow"],
            watch: {},
            created: function created() {
            },
            mounted: function mounted() {
            },
            methods: {
                //返回
                go_back: function go_back() {
                    this.changeProgrammeShow(false);
                }
            }
        });

        /***/
    }),

    /***/ 277567:
    /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(750697);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26100);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(196319);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(378928);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(286226);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(536751);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(925110);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6__);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(53930);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7__);
        /* harmony import */
        var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(849859);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(308628);
        /* harmony import */
        var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_8__);
        /* harmony import */
        var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(795093);
        /* harmony import */
        var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
        /* harmony import */
        var _my_mixins_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(213934);


        function ownKeys(e, r) {
            var t = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(e);
            if ((_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default())) {
                var o = _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(e);
                r && (o = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default()(o).call(o, function (r) {
                    return _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(e, r).enumerable;
                })), t.push.apply(t, o);
            }
            return t;
        }

        function _objectSpread(e) {
            for (var r = 1; r < arguments.length; r++) {
                var _context2, _context3;
                var t = null != arguments[r] ? arguments[r] : {};
                r % 2 ? _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default()(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) {
                    (0, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */.A)(e, r, t[r]);
                }) : (_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default()) ? _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6___default()(e, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default()(t)) : _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default()(_context3 = ownKeys(Object(t))).call(_context3, function (r) {
                    _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7___default()(e, r, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(t, r));
                });
            }
            return e;
        }


        /* harmony default export */
        __webpack_exports__.A = ({
            data: function data() {
                return {
                    activeName: "topic_describe",
                    classroom_id: this.$route.params.classroom_id,
                    problemDescibe: null,
                    //题目描述
                    submitList: [],
                    //提交记录
                    limit: 10,
                    page: 1,
                    offset: 0,
                    total: 0,
                    submission_id: "",
                    table_height: "calc(100vh - 306px)"
                };
            },
            computed: {},
            mixins: [_my_mixins_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */.A],
            props: ["status", "problem_id", "sku_id", "defaultProblem"],
            watch: {},
            created: function created() {
                this.get_problem_detail();
                if (this.status == "submit_record") {
                    this.activeName = "submit_record";
                }
            },
            mounted: function mounted() {
            },
            filters: {
                dateformat: function dateformat(val) {
                    return moment__WEBPACK_IMPORTED_MODULE_10___default()(val).format("YYYY/MM/DD HH:mm");
                }
            },
            methods: {
                //切换tab
                handleClick: function handleClick(tab) {
                    // if (tab.name === "submit_record") {
                    //   this.get_submit_list();
                    // }
                },
                //获取题目详情
                get_problem_detail: function get_problem_detail() {
                    var _this = this;
                    var params = {
                        classroom_id: this.classroom_id,
                        sku_id: this.sku_id
                    };
                    request.get(API.studentExercise.get_oj_detail.replace(/\{problem_id\}/gi, this.problem_id), params).then(function (res) {
                        if (res.data.success) {
                            _this.problemDescibe = res.data.data;
                            _this.get_submit_list();
                        } else {
                            //其他异常都toast提示
                            _this.$message({
                                message: res.data.msg,
                                type: "warn"
                            });
                        }
                    })["catch"](function (err) {
                        _this.$message({
                            message: err.msg,
                            type: "warn"
                        });
                    });
                },
                //获取提交记录
                get_submit_list: function get_submit_list() {
                    var _this2 = this;
                    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    var params = _objectSpread({
                        classroom_id: this.classroom_id,
                        sku_id: this.sku_id,
                        limit: this.limit,
                        page: this.page,
                        offset: this.offset,
                        problem_id: this.problem_id
                    }, data);
                    request.get(API.studentExercise.get_sub_list, params).then(function (res) {
                        if (res.data.success) {
                            var _res = res.data && res.data.data && res.data.data.data;
                            _this2.submitList = _res.results;
                            _this2.total = _res.total;
                            if (_this2.page == 1 && _this2.offset == 0 && _res.results.length) {
                                _this2.$emit("eval_result", _res.results[0].result, _res.results[0].id);
                            }
                        } else {
                            //其他异常都toast提示
                            _this2.$message({
                                message: res.data.msg,
                                type: "warn"
                            });
                        }
                    })["catch"](function (err) {
                        _this2.$message({
                            message: err.msg,
                            type: "warn"
                        });
                    });
                },
                handleCurrentChange: function handleCurrentChange(val) {
                    this.page = val;
                    this.offset = (val - 1) * this.limit;
                    this.get_submit_list();
                },
                rowEnter: function rowEnter(row, column, cell, event) {
                    cell.style.cursor = "pointer";
                },
                //排序
                indexMethod: function indexMethod(index) {
                    return this.total - (this.page - 1) * this.limit - index;
                },
                //点击单元格查看详情
                cellHandleClick: function cellHandleClick(row, column, cell, event) {
                    var _context;
                    var routeData = this.$router.resolve({
                        name: "ojSubDetail",
                        params: {
                            classroom_id: this.classroom_id
                        },
                        query: {
                            sku_id: this.sku_id,
                            submission_id: row.id,
                            title: this.problemDescibe.title,
                            xtbz: _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_8___default()(_context = location.href).call(_context, 'ismove=1') ? 'xt' : 'cloud'
                        }
                    });
                    window.open(routeData.href, "_blank");
                }
            }
        });

        /***/
    }),

    /***/ 877897:
    /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
            /* harmony export */   X: function () {
                return /* binding */ render;
            },
            /* harmony export */   Y: function () {
                return /* binding */ staticRenderFns;
            }
            /* harmony export */
        });
        var render = function render() {
            var _vm = this,
                _c = _vm._self._c;
            return _c('div', {
                staticClass: "code-mirror-warp"
            }, [_c('div', {
                staticClass: "top-handle"
            }, [_c('div', {
                staticClass: "top-handle__item"
            }, [_c('el-select', {
                attrs: {
                    "popper-class": "top-select"
                },
                on: {
                    "change": _vm.onLangChange
                },
                model: {
                    value: _vm.language_item,
                    callback: function callback($$v) {
                        _vm.language_item = $$v;
                    },
                    expression: "language_item"
                }
            }, _vm._l(_vm.languages, function (item) {
                return _c('el-option', {
                    key: item,
                    attrs: {
                        "label": item,
                        "value": item
                    }
                }, [_vm._v(_vm._s(item) + "\n        ")]);
            }), 1), _vm._v(" "), _c('el-tooltip', {
                attrs: {
                    "popper-class": "dia-icon",
                    "content": "还原到默认代码模板",
                    "placement": "top",
                    "effect": "light"
                }
            }, [_c('span', {
                staticClass: "icon-item",
                staticStyle: {
                    "margin": "0 12px"
                }
            }, [_c('i', {
                staticClass: "iconfont icon-shuaxin",
                on: {
                    "click": _vm.onResetClick
                }
            })])]), _vm._v(" "), _c('el-tooltip', {
                attrs: {
                    "popper-class": "dia-icon",
                    "content": "上传附件",
                    "placement": "top-start",
                    "effect": "light"
                }
            }, [_c('span', {
                staticClass: "icon-item"
            }, [_c('i', {
                staticClass: "iconfont icon-shangchuanfujian",
                on: {
                    "click": _vm.onUploadFile
                }
            })])]), _vm._v(" "), _c('input', {
                staticStyle: {
                    "display": "none"
                },
                attrs: {
                    "id": "file",
                    "type": "file"
                },
                on: {
                    "change": _vm.onUploadFileDone
                }
            })], 1), _vm._v(" "), _c('div', {
                staticClass: "top-handle__item"
            }, [_c('el-popover', {
                attrs: {
                    "placement": "bottom",
                    "trigger": "click",
                    "width": "200",
                    "popper-class": "dialog-themes"
                }
            }, [_c('ul', {
                staticClass: "pro-themes"
            }, _vm._l(_vm.themes, function (item) {
                return _c('li', {
                    key: item.label,
                    "class": {
                        selected: _vm.current == item.label
                    },
                    on: {
                        "click": function click($event) {
                            return _vm.onThemeChange(item.value, item.label);
                        }
                    }
                }, [_c('span', [_vm._v(_vm._s(item.value))]), _vm._v(" "), _c('span', {
                    staticClass: "circle",
                    "class": item.label
                })]);
            }), 0), _vm._v(" "), _c('span', {
                staticClass: "icon-item",
                attrs: {
                    "slot": "reference"
                },
                slot: "reference"
            }, [_c('i', {
                staticClass: "iconfont icon-pifu"
            })])]), _vm._v(" "), _c('span', {
                staticClass: "icon-item",
                staticStyle: {
                    "margin-left": "12px"
                },
                on: {
                    "click": _vm.full_edit
                }
            }, [_c('i', {
                staticClass: "iconfont icon-quanping1"
            })])], 1)]), _vm._v(" "), _c('codemirror', {
                ref: "myEditor",
                attrs: {
                    "value": _vm.value,
                    "options": _vm.options
                },
                on: {
                    "change": _vm.onEditorCodeChange
                }
            })], 1);
        };
        var staticRenderFns = [];


        /***/
    }),

    /***/ 26562:
    /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
            /* harmony export */   X: function () {
                return /* binding */ render;
            },
            /* harmony export */   Y: function () {
                return /* binding */ staticRenderFns;
            }
            /* harmony export */
        });
        var render = function render() {
            var _vm = this,
                _c = _vm._self._c;
            return _c('div', [_c('script', {
                attrs: {
                    "id": _vm.id,
                    "type": "text/plain"
                }
            })]);
        };
        var staticRenderFns = [];


        /***/
    }),

    /***/ 793892:
    /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
            /* harmony export */   X: function () {
                return /* binding */ render;
            },
            /* harmony export */   Y: function () {
                return /* binding */ staticRenderFns;
            }
            /* harmony export */
        });
        var render = function render() {
            var _vm = this,
                _c = _vm._self._c;
            return _c('section', {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: _vm.visible,
                    expression: "visible"
                }],
                staticClass: "annotation",
                attrs: {
                    "aria-page": "annotation-page"
                },
                on: {
                    "click": function click($event) {
                        if ($event.target !== $event.currentTarget) return null;
                        return _vm.handleClosed.apply(null, arguments);
                    }
                }
            }, [_c('section', {
                staticClass: "annotation__box"
            }, [_c('header', {
                staticClass: "annotation--title"
            }, [_vm._v("批注")]), _vm._v(" "), _vm.anno && _vm.anno.content ? _c('article', {}, [_c('section', {
                staticClass: "annotation--text"
            }, [_vm._v(_vm._s(_vm.anno.content.text))]), _vm._v(" "), _c('img', {
                staticClass: "annotation--image",
                attrs: {
                    "src": _vm.anno.content.pic,
                    "alt": ""
                },
                on: {
                    "click": _vm.handleView
                }
            })]) : _vm._e(), _vm._v(" "), _c('p', {
                staticClass: "annotation--close",
                on: {
                    "click": _vm.handleClosed
                }
            }, [_c('svg', {
                staticClass: "icon f25",
                attrs: {
                    "aria-hidden": "true"
                }
            }, [_c('use', {
                attrs: {
                    "xlink:href": "#icon--shoujiguanbi"
                }
            })])])])]);
        };
        var staticRenderFns = [];


        /***/
    }),

    /***/ 92784:
    /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
            /* harmony export */   X: function () {
                return /* binding */ render;
            },
            /* harmony export */   Y: function () {
                return /* binding */ staticRenderFns;
            }
            /* harmony export */
        });
        var render = function render() {
            var _vm = this,
                _c = _vm._self._c;
            return _c('div', {
                staticClass: "header-bar__wrap"
            }, [_c('div', {
                staticClass: "header-bar"
            }, [_c('div', {
                staticClass: "f14 title fl"
            }, [_vm.leafData.leaf_type === 0 ? _c('i', {
                staticClass: "iconfont icon--shipin"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 1 ? _c('i', {
                staticClass: "iconfont icon--yinpin"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 2 ? _c('i', {
                staticClass: "iconfont icon--zhibo"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 3 ? _c('i', {
                staticClass: "iconfont icon--tuwen"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 4 ? _c('i', {
                staticClass: "iconfont icon--taolun1"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 5 ? _c('i', {
                staticClass: "iconfont icon--kaoshi"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 6 ? _c('i', {
                staticClass: "iconfont icon--zuoye"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 7 ? _c('i', {
                staticClass: "iconfont icon--Hkejian1"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 8 ? _c('i', {
                staticClass: "iconfont icon--ketang1"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 9 ? _c('i', {
                staticClass: "iconfont icon--kaoshi1"
            }) : _vm._e(), _vm._v(" "), _vm.leafData.leaf_type === 10 ? _c('i', {
                staticClass: "iconfont icon--tuwen1"
            }) : _vm._e(), _vm._v(" "), _c('span', {
                staticClass: "text text-ellipsis"
            }, [_vm._v(_vm._s(_vm.leafData.name))])]), _vm._v(" "), _vm.leafData.score_deadline || _vm.classInfo.is_class_end ? _c('div', {
                staticClass: "f12 time line fl"
            }, [_c('span', {
                "class": [_vm.leafData.is_assessed || _vm.classInfo.is_class_end ? 'time-gray' : 'time-blue']
            }, [_vm._v("考核截止时间：" + _vm._s(_vm._f("formatScoreDeadline")(_vm.leafData.score_deadline || _vm.classInfo.end)))])]) : _vm._e(), _vm._v(" "), _c('div', {
                staticClass: "fr"
            }, [_vm.preLeaf.id !== '' ? _c('span', {
                staticClass: "btn-pre pointer",
                on: {
                    "click": function click($event) {
                        return _vm.goDetail(_vm.preLeaf, $event);
                    }
                }
            }, [_c('i', {
                staticClass: "iconfont icon--danjiantouxiangzuo color-9b"
            }), _vm._v(" "), _c('span', {
                staticClass: "f14 color6"
            }, [_vm._v("上一单元")])]) : _vm._e(), _vm._v(" "), _vm.nextLeaf.id !== '' ? _c('span', {
                staticClass: "btn-next ml20 pointer",
                on: {
                    "click": function click($event) {
                        return _vm.goDetail(_vm.nextLeaf, $event);
                    }
                }
            }, [_c('span', {
                staticClass: "f14 color6"
            }, [_vm._v("下一单元")]), _vm._v(" "), _c('i', {
                staticClass: "iconfont icon--danjiantouxiangyou color-9b"
            })]) : _vm._e(), _vm._v(" "), _c('span', {
                staticClass: "catalogue line ml20",
                on: {
                    "click": function click($event) {
                        return _vm.changeShowChapter($event);
                    }
                }
            }, [_c('i', {
                staticClass: "iconfont icon--liebiao color-9b"
            }), _vm._v(" "), _c('span', {
                staticClass: "f14 color6"
            }, [_vm._v("目录")])])])]), _vm._v(" "), _vm.showChapter ? _c('left-layer', {
                attrs: {
                    "idInfo": _vm.idInfo,
                    "courseData": _vm.courseData,
                    "classInfo": _vm.classInfo
                },
                on: {
                    "closeLayer": _vm.closeLayer,
                    "goDetail": _vm.goDetail,
                    "changeHasMosue": _vm.changeHasMosue
                }
            }) : _vm._e()], 1);
        };
        var staticRenderFns = [];


        /***/
    })

}]);
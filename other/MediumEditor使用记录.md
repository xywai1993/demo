

# 配置按钮

```javascript
const defaultData = {
                h1: {
                    name: 'h1',
                    aria: '一级标题',
                    contentDefault: '一级标题',
                },            
                orderedlist: {
                    name: 'orderedlist',
                    aria: '有序列表',
                    contentDefault: '有序列表',
                },                          
                pre: {
                    name: 'pre',
                    aria: '代码块',
                    contentDefault: '插入代码',
                    handleClick(event) {
                        event.preventDefault();
                        event.stopPropagation();

                        let action = this.getAction();

                        if (action) {
                            //this.base 为引用的实例 
                            if (!this.base.getSelectedParentElement().classList.contains('custom-edit-con') && this.base.getSelectedParentElement().nodeName.toUpperCase() !== 'P') {
                                this.base.selectElement(this.base.getSelectedParentElement());
                            }
                            this.execAction(action);
                        }
                    }
                },
            }
``` 
中文配置可按上述修改每个按钮对应的 aria  和 contentDefault




# 使用

```javascript
const mediu = new MediumEditor('.editable', {
                placeholder: false,  
                spellcheck: false,
                toolbar: {    //工具条的配置
                    buttons: button,
                    relativeContainer: document.querySelector('.tool-bar'),
                    standardizeSelectionStart: false,
                    static: true,
                    // sticky:true,
                    updateOnEmptySelection: true
                },
                paste: {    //对复制内容的 配置
                    forcePlainText: true,
                    cleanPastedHTML: true,
                    cleanAttrs: ['style', 'dir', 'id', 'class'],
                    cleanTags: ['label', 'meta', 'style'], //要清除的标签
                    unwrapTags: ['sub', 'sup', 'a', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'code', 'section', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'b', 'i', 'span']  //清除标签但保留内容
                },
                extensions: {   //调用插件
                    'disable-button': new disabledButton(),
                }
            }).subscribe('editableInput', function (event, editable) {
                //编辑的内容改变后的回调            
                //....do something
            });
```

# medium插件的写法
```javascript
 const disabledButton = MediumEditor.Extension.extend({
        name: 'disabled-button',
        init() {
            this.subscribe('hideToolbar', this.resetToolbar.bind(this));
        },
        checkState: function (node) {
            // console.log(node.nodeName);
            let name = node.nodeName;
            let toolbar = this.base.getExtensionByName('toolbar');
            let selectParentElement = this.base.getSelectedParentElement();

            if (selectParentElement.classList.contains('custom-edit-con')) {
                this.resetToolbar();
            }
            // 去除 引用内  产生的 span 标签         
            if (selectParentElement.nodeName.toUpperCase() === 'BLOCKQUOTE') {
                let span = selectParentElement.querySelector('span');
                span && MediumEditor.util.unwrapTags(span, 'span');

                let p = selectParentElement.querySelector('p');
                p && MediumEditor.util.unwrapTags(p, 'p');
            }
            // 去除 代码块内  产生的 span p标签
            if (selectParentElement.nodeName.toUpperCase() === 'PRE') {
                let span = selectParentElement.querySelector('span');
                span && MediumEditor.util.unwrapTags(span, 'span');

                let p = selectParentElement.querySelectorAll('p');
                Array.from(p).forEach(item => {
                    MediumEditor.util.unwrapTags(item, 'p');
                });
                // p&&MediumEditor.util.unwrapTags(p,'p');
            }
            // 去除 span  标签
            if (selectParentElement.nodeName.toUpperCase() === 'SPAN') {
                MediumEditor.util.unwrapTags(selectParentElement, 'span');
            }

          
            toolbar.forEachExtension(function (extension) {

                if (typeof extension.getButton === 'function') {
                    let button = extension.getButton();

                    if (name === 'BLOCKQUOTE' && extension.name !== 'quote') {

                        button.setAttribute('disabled', true);

                    } else if (name === 'PRE' && extension.name !== 'pre') {

                        button.setAttribute('disabled', true);
                    } else if (name === 'OL' && extension.name !== 'orderedlist') {

                        button.setAttribute('disabled', true);
                    } else if (name === 'UL' && extension.name !== 'unorderedlist') {

                        button.setAttribute('disabled', true);
                    } else if (name === 'H1' && extension.name !== 'h1') {

                        button.setAttribute('disabled', true);
                    } else if (name === 'H2' && extension.name !== 'h2') {

                        button.setAttribute('disabled', true);
                    }
                    else if (name === 'P') {
                        button.removeAttribute('disabled');
                    }

                    if (name === 'BLOCKQUOTE' && extension.name === 'quote') {

                        button.removeAttribute('disabled');

                    } else if (name === 'PRE' && extension.name === 'pre') {

                        button.removeAttribute('disabled');
                    } else if (name === 'OL' && extension.name === 'orderedlist') {

                        button.removeAttribute('disabled');
                    } else if (name === 'UL' && extension.name === 'unorderedlist') {

                        button.removeAttribute('disabled');
                    } else if (name === 'H1' && extension.name === 'h1') {

                        button.removeAttribute('disabled');
                    } else if (name === 'H2' && extension.name === 'h2') {

                        button.removeAttribute('disabled');
                    }


                }

            });
        },
        resetToolbar() {
            MediumEditor.util.unwrapTags(this.base.elements[0], 'span');
            this.base.trigger('editableInput');
            let toolbar = this.base.getExtensionByName('toolbar');
            toolbar.forEachExtension(function (extension) {

                if (typeof extension.getButton === 'function') {
                    let button = extension.getButton();
                    button.removeAttribute('disabled');
                }

            });
        }
    });
```
上述插件的作用：
清除在引用和代码块内产生的不符合自己项目的额外标签，以及 在编辑引用和代码块时，其他toolbar上的按钮禁用

MediumEditor.util  工具包，提供文本编辑的各种方法 

getSelectedParentElement()  比较重要的方法  获取当前选择的父元素



# 做编辑框项目的一些 工具方法

```javascript
 const tool = {
        //转义字符
        html2Escape(sHtml) {
            return sHtml.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '”' }[c] });
        },
        
        // html 文本 转 json
        mapDOM(domString) {
            let treeObject = {};

            let str = domString.replace(/<p>\s<\/p>/g, '').replace(/<br>/g, '\n');
            console.log(str);
            let elementArr = $.parseHTML(str);
            if (!elementArr) {
                return [];
            }
            const treeHTML = (arr, tree) => {
                tree.content = [];
                arr.forEach((item, i) => {
                    // 文本节点
                    console.log(item.nodeType);
                    if (item.nodeType === 3) {
                        tree.content.push({ type: 'p', content: item.nodeValue });
                    } else {
                        // 没内容的其他html节点
                        if (item.childNodes.length === 0) {
                            tree.content.push({ type: item.nodeName.toLowerCase(), content: '' });
                        } else if (item.childNodes.length === 1 && item.childNodes[0].nodeType === 3) {               // 有文本内容的html节点
                            tree.content.push({ type: item.nodeName.toLowerCase(), content: item.childNodes[0].nodeValue });
                        } else {
                            // 有多个html节点
                            tree.content[i] = { type: item.nodeName.toLowerCase() };
                            treeHTML(item.childNodes, tree.content[i]);
                        }
                    }

                    if (item.attributes != null) {
                        if (item.attributes.length) {
                            tree.content[i]['attr'] = {};
                            for (let k = 0; k < item.attributes.length; k++) {
                                tree.content[i]['attr'][item.attributes[k].name] = item.attributes[k].nodeValue;
                            }
                        }
                    }

                });

            };

            treeHTML(elementArr, treeObject);
            return treeObject.content;
        },
        
        //json 转html
        mapToHtml(array) {
            let arr = (typeof array === typeof '123') ? JSON.parse(array) : array;
            let html = '';
            arr.forEach(item => {
                // const tag = document.createElement(item.type);
                let attr = item.attr ? Object.keys(item.attr).map(it => {
                    return `${it}=${item.attr[it]}`;
                }).join(' ') : '';
                if (typeof item.content === 'string') {
                    let con = tool.html2Escape(item.content);
                    // let con = item.content;
                    html += `<${item.type} ${attr}>${con}</${item.type}>`;
                } else if (typeof item.content === 'object') {
                    html += `<${item.type} ${attr}>${tool.mapToHtml(item.content)}</${item.type}>`;
                } else {
                    html += '数据有误';
                }
            });

            return html;
        },     
        /**
         * 使得 经过 mapDOM 的 json数据对象只有一层，不存在多级对象嵌套
         * @param {Array} arr
         */
        mapJSONonlyOne(arr) {
            let guolvArr = ['ul', 'ol', 'dl'];  //这些表情不执行过滤 ,其实应该还有table tr td 等，看项目需求
          
            let guolv = (arr) => {
                let old = JSON.parse(JSON.stringify(arr));
                let k = 0;
                old.forEach((item, i) => {
                    if (Array.isArray(item.content) && !guolvArr.includes(item.type)) {
                        arr.splice(i + k, 1, ...guolv(item.content));
                        k += item.content.length - 1;
                    }

                });
                return arr;
            };

            return guolv(arr);

        }
    }
```

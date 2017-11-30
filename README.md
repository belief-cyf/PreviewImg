# PreviewImg
react PreviewImg component, support PC or mobile
---
> 依赖react-cropper，单纯用于图片放大缩小预览。支持PC鼠标滚轮进行放大预览以及移动端手指缩放。


组件属性：

| 属性           | 说明           | 类型  | 默认值  |
| :-:   |:-------------| :-| :-  |
| breviaryImgSrc        | 显示的缩略图地址 | string     |  null|
| inModal        | 是否在modal中展示图片预览区域  false时则直接显示图片 并支持放大缩小,需限制组件父容器的宽高并设置溢出隐藏，不然图片支持无限放大 | bool     |  true|
| src        | 传入的图片源 图片源要可以跨域访问 | string     |  http://youimg1.c-ctrip.com/target/tg/730/879/156/0d001cbaa3794f879ceab648b513107a.jpg|
| thumbnailStyle        | 设置图片缩略图的宽高 | object     |  {width: '150px',height: '150px'}|
| showMagnifying        | 是否显示放大镜 显示放大镜时通过点击放大镜触发预览界面，不显示时通过点击图片触发预览界面 | bool     |  true |
| magnifyingRight        | 放大镜定位 right | string     |  18px|
| magnifyingBottom        | 放大镜定位 bottom | string     |  18px|
| removeBtn        | 是否显示右上角关闭按钮 | bool     |  false|
| removeCallBack        | 关闭后的回调函数 | func     |  ()>{}|
| width        | 初始化时显示的图片宽度 | string     |  100%|
| height        | 初始化时显示的图片高度 | string     |  100%|

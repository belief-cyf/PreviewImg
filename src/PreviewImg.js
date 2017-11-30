/*
 * 图片预览组件
 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Cropper from 'react-cropper';
import { Modal } from 'antd';
import CSSModules from 'react-css-modules';
import 'cropperjs/dist/cropper.css';
import styles from './PreviewImg.scss';
class PreviewImg extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modalVisible: false,
            newKey: Math.random(),                               // 每次打开modal时 重置modal的状态
            isMount: true
        };
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalHide = this.handleModalHide.bind(this);
        this.removePreviewImg = this.removePreviewImg.bind(this);
        this.GoHalfRotate = this.GoHalfRotate.bind(this);
    }

    static defaultProps = {
        breviaryImgSrc: '',    // 缩略图地址
        inModal: true,                                                                                                      // 是否在modal中展示图片预览区域  false时则直接显示图片 并支持放大缩小,需限制组件父容器的宽高并设置溢出隐藏，不然图片支持无限放大
        src: 'http://youimg1.c-ctrip.com/target/tg/730/879/156/0d001cbaa3794f879ceab648b513107a.jpg',             // 传入的图片源 图片源要可以跨域访问
        thumbnailStyle: {                                                                                                   // 自由设置图片缩略图的宽高
            width: '150px',
            height: '150px'
        },
        showMagnifying: true,                                                                                               // 是否显示放大镜 显示放大镜时通过点击放大镜触发预览界面，不显示时通过点击图片触发预览界面
        magnifyingRight: '18px',                                                                                            // 放大镜定位 right
        magnifyingBottom: '18px',                                                                                           // 放大镜定位 bottom
        removeBtn: false,                                                                                                   // 是否显示右上角关闭按钮
        removeCallBack: () => { console.log('关闭成功') },                                                                   // 关闭后的回调函数 just do you want
        width: '100%',                                                            // 初始化时显示的图片宽度
        height: '100%'                                                              // 初始化时显示的图片高度
    }

    // 打开预览弹出层
    handleModalShow () {
        this.setState({
            modalVisible: true,
            newKey: Math.random()
        })
    }

    // 关闭预览弹出层
    handleModalHide () {
        this.setState({
            modalVisible: false,
            newKey: Math.random()
        })
    }

    // remove自身
    removePreviewImg () {
        this.setState({
            isMount: false
        }, () => {
            this.props.removeCallBack();
        })
    }

    // 提供旋转图片的方法供外部调用 参数传旋转的角度
    GoHalfRotate (e) {
        let cropper = this.refs.cropper;
        cropper.rotate(e);
    };

    render () {
        const cropperView = <Cropper
          ref='cropper'
          src={this.props.src}
          style={{height: this.props.height, maxWidth: this.props.width}}
          dragMode='move'
          toggleDragModeOnDblclick={false}
          background={false}
          checkCrossOrigin={false}
        />;
        return (
            <div className='preview-img' styleName='preview-img'>
                {this.props.inModal ? (this.state.isMount && [<div className='thumbnail-box' style={this.props.thumbnailStyle} key='1'>
                    <img src={this.props.breviaryImgSrc || this.props.src} style={this.props.thumbnailStyle} onClick={this.handleModalShow} />
                    {
                            this.props.showMagnifying && <div className='magnifying-box' onClick={this.handleModalShow} style={{right: this.props.magnifyingRight, bottom: this.props.magnifyingBottom}}>
                                <i className='iconfont icon-fangdajing' />
                            </div>
                        }
                    {
                            this.props.removeBtn && <div className='remove-box' onClick={this.removePreviewImg}>
                                <i className='iconfont icon-x' />
                            </div>
                        }
                </div>,
                    <Modal
                      key={this.state.newKey}
                      visible={this.state.modalVisible}
                      footer={null} onCancel={this.handleModalHide}
                      width='95%'
                      maskClosable={false}
                      className='preview-modal'
                      styleName='preview-modal'
                        >
                        {cropperView}
                    </Modal>]) : cropperView}
            </div>
        )
    }
}

PreviewImg.propTypes = {
    src: PropTypes.string,
    thumbnailStyle: PropTypes.object,
    showMagnifying: PropTypes.bool,
    magnifyingRight: PropTypes.string,
    magnifyingBottom: PropTypes.string,
    removeBtn: PropTypes.bool,
    removeCallBack: PropTypes.func,
    inModal: PropTypes.bool,
    breviaryImgSrc: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}
export default CSSModules(PreviewImg, styles);

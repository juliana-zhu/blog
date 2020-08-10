

# React 生命周期

## 旧生命周期

![](./img/react-life-cycle-old.jpg)

## 新生命周期

![](./img/react-life-cycle-new.jpg)

### getDerivedStateFromProps

+ static getDerivedStateFromProps(props, state) 这个生命周期的功能实际上就是将传入的props映射到state上面，其返回的值会作为state的值

### getSnapshotBeforeUpdate

+ getSnapshotBeforeUpdate() 被调用于**render之后**，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给componentDidUpdate(pervProps, pervState, snapshotReturnData)

+ ```javascript
  getSnapshotBeforeUpdate() {//很关键的，我们获取当前rootNode的scrollHeight，传到componentDidUpdate 的参数perScrollHeight
    return this.wrapper.current.scrollHeight;
  }
  componentDidUpdate(pervProps, pervState, prevScrollHeight) {
    const curScrollTop = this.wrapper.current.scrollTop;//当前向上卷去的高度
    //当前向上卷去的高度加上增加的内容高度
    this.wrapper.current.scrollTop = curScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
  }
  ```

+ 


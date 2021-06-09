---
title: Context 上下文
date: 2020-03-17
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
publish: true
---
# Context 上下文
+ 对于有些需要很多组件之间共享的属性，此时一层层传递值的方式已经不适用，context是一种解决方案
+ Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props

## 创建context

```javascript
let ThemeContext = React.createContext<ContextValue | null>(null);
```

## 定义提供者Provider

```javascript
class Page extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = { color: 'red' };
    }
    changeColor = (color: string) => {
        this.setState({ color });
    }
    render() {
        let contextVal: ContextValue = { changeColor: this.changeColor, color: this.state.color };
        return (
            <ThemeContext.Provider value={contextVal}>
                <div style={{ margin: '10px', border: `5px solid ${this.state.color}`, padding: 5, width: 200 }}>
                    page
                    <Header />
                    <Main />
                </div>
            </ThemeContext.Provider>

        )
    }
}
```

## 定义消费者Consumer

```javascript
class Content extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {
                    (value: ContextValue | null) => (
                        <div style={{ border: `5px solid ${value!.color}`, padding: 5 }}>
                            Content
                            <button onClick={() => value!.changeColor('red')} style={{ color: 'red' }}>红色</button>
                            <button onClick={() => value!.changeColor('green')} style={{ color: 'green' }}>绿色</button>
                        </div>
                    )
                }
            </ThemeContext.Consumer>

        )
    }
}
```

## 实现

```javascript
interface ContextValue {
    color: string;
    changeColor: (color: string) => void
}
interface ContextProps<T> {
    value: T
}
function createContext<T>(defaultValue: T) {
    class Provider extends React.Component<ContextProps<T>> {
        static value: T = defaultValue;
        constructor(props: ContextProps<T>) {
            super(props);
            Provider.value = props.value
            this.state = { value: props.value };
        }
        static getDerivedStateFromProps(nextProps: ContextProps<T>, prevState: ContextProps<T>) {
            Provider.value = nextProps.value
            return { value: nextProps.value };
        }
        render() {
            return this.props.children;
        }
    }
    interface ConsumerProps {
        children: (value: T) => React.ReactNode
    }
    class Consumer extends React.Component<ConsumerProps> {
        render() {
            return this.props.children(Provider.value);
        }
    }
    return {
        Provider,
        Consumer
    }
}
```



## 注意

+ 消费者内部需使用方法接收数据

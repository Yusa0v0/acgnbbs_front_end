# acgnbbs

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 项目运行自动打开浏览器，
``` 
"serve": "vue-cli-service serve --open --host=localhost"
```

### 关闭eslint校验
``` 
vue.config.js文件中添加lintOnSave: false
```

### 为src目录配置别名@
``` 
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}
```
### 路由组件(views|pages文件夹)
``` 
home、article、login、register
```
### 非路由组件(components文件夹)
``` 
header、footer、sider
```

### 配置路由
``` 
放置在router文件夹中
```
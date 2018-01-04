## 命令行
clear 清空命令行

## 修改host
1. 进入根目录
```base
    cd /
```
2.  
```base
    sudo vi etc/hosts
```
3. 按 **i** 健 进入编辑模式

4. 按 **esc** 退出编辑模式
5. 编辑好后按 **:wq!** 保存并退出

## 查看IP地址
```base
osascript -e "system info"  
```

可以输出系统的所有信息
所以 
```base
osascript -e "IPv4 address of (system info)"
```

就可以输出系统的 IPv4 的地址了

## 关闭指定端口

```
lsof -i:端口号
```
```
kill -9 PID
```

## 截图

```
control+command+a
```

## 打开未知应用来源
sudo spctl --master-disable
sudo spctl --master-enable


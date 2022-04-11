

### 持久层

entity  -- 实体类

mapper  -- 接口

mapper.xml

```txt
namespace  指向接口
id 指向方法名称

resultMap标签中 id标签:
	主键映射不可省略

property配置mapper.xml映射文件
mybatis
	mapperLocations: classpath*:mapper/**/*Mapper.xml
```





### 业务层

### 控制层
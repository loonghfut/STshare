---
title: 2025
date: 2025-05-01T13:38:17Z
lastmod: 2025-10-02T14:48:05Z
---

![image](https://tbz.ltyuanfang.cn/fj/2020/041212808e784.jpg)

# 2025

测试CCC#工具#

测试CCC#测试#

测试CCC#娱乐#

测试CCC测试CCC测试CCC测试CCC

测试CCC#学习#

```echarts
(() => {
    function fetchSqlSync(sql){
      try{
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/api/query/sql', false);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify({stmt: sql}));
        if (xhr.status>=200 && xhr.status<300){
          var res = {};
          try { res = JSON.parse(xhr.responseText || '[]'); } catch { res = []; }
          var rows = Array.isArray(res) ? res : (res.data || []);
          return Array.isArray(rows) ? rows : [];
        }
      } catch(e){ /* ignore */ }
      return [];
    }
    
    // 数据预处理函数: box字段ID转name + 时间戳转换 + IAL解析
    function preprocessData(rows) {
      if (!rows || !rows.length) return rows;
      
      // 构建笔记本ID到name的映射表
      var notebooksMap = new Map();
      try {
        if (typeof window !== 'undefined' && window.siyuan && window.siyuan.notebooks) {
          window.siyuan.notebooks.forEach(function(nb) {
            notebooksMap.set(nb.id, nb.name);
          });
        }
      } catch(e) { console.warn('加载笔记本列表失败:', e); }
      
      // 时间戳转换函数
      function convertTimestamp(timestamp) {
        if (!timestamp) return timestamp;
        var ts = String(timestamp);
        
        // 验证格式: 14位数字 YYYYMMDDHHMMSS
        if (!/^\d{14}$/.test(ts)) return ts;
        
        try {
          var year = ts.substring(0, 4);
          var month = ts.substring(4, 6);
          var day = ts.substring(6, 8);
          var hour = ts.substring(8, 10);
          var minute = ts.substring(10, 12);
          var second = ts.substring(12, 14);
          
          // 返回标准格式: 2025-09-30 23:02:10
          return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        } catch(e) {
          return ts;
        }
      }
      
      // IAL解析函数
      function parseIAL(ial) {
        if (!ial || typeof ial !== 'string') return {};
        
        try {
          var content = ial.trim();
          if (content.startsWith('{:')) content = content.substring(2);
          if (content.endsWith('}')) content = content.substring(0, content.length - 1);
          content = content.trim();
          
          var result = {};
          var regex = /(\w[\w-]*)\s*=\s*"([^"]*)"/g;
          var match;
          
          while ((match = regex.exec(content)) !== null) {
            result[match[1]] = match[2];
          }
          
          return result;
        } catch(e) {
          return {};
        }
      }
      
      // 第一步: 处理每一行数据
      var processedRows = rows.map(function(row) {
        if (!row) return row;
        var processedRow = Object.assign({}, row);
        
        // 转换box字段
        if (processedRow.box && notebooksMap.has(processedRow.box)) {
          processedRow.box = notebooksMap.get(processedRow.box);
        }
        
        // 转换时间戳字段
        if (processedRow.created) {
          processedRow.created = convertTimestamp(processedRow.created);
        }
        if (processedRow.updated) {
          processedRow.updated = convertTimestamp(processedRow.updated);
        }
        
        // 解析IAL字段
        if (processedRow.ial) {
          var ialParsed = parseIAL(processedRow.ial);
          
          // 将IAL属性添加为新字段 (ial_ 前缀)
          Object.keys(ialParsed).forEach(function(key) {
            var fieldName = 'ial_' + key;
            var value = ialParsed[key];
            
            // 如果是时间戳格式,也进行转换
            if (/^\d{14}$/.test(value)) {
              processedRow[fieldName] = convertTimestamp(value);
            } else {
              processedRow[fieldName] = value;
            }
          });
          
          // 转为JSON字符串避免显示[object Object]
          processedRow.ial_parsed = JSON.stringify(ialParsed);
          processedRow.ial_keys = Object.keys(ialParsed).join(', ');
        }
        
        return processedRow;
      });
      
      // 第二步: 收集所有IAL字段并填充默认值
      var allIALKeys = [];
      processedRows.forEach(function(row) {
        Object.keys(row).forEach(function(key) {
          if (key.indexOf('ial_') === 0 && key !== 'ial_parsed' && key !== 'ial_keys') {
            if (allIALKeys.indexOf(key) === -1) {
              allIALKeys.push(key);
            }
          }
        });
      });
      
      // 为每一行填充缺失的IAL字段,默认值为 "无"
      if (allIALKeys.length > 0) {
        processedRows.forEach(function(row) {
          allIALKeys.forEach(function(key) {
            if (!(key in row)) {
              row[key] = '无';
            }
          });
        });
      }
      
      return processedRows;
    }
    
    const option = {};
    var rawRows = fetchSqlSync("select * from blocks WHERE markdown LIKE '%测试CC%'");
    const rows = preprocessData(rawRows);
    
    // 计算 X轴 数据
    const xAxisData = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })());
    
    option.title = { text: "" };
    option.title.left = "center"; option.title.top = 0; 
    option.backgroundColor = 'transparent';
    option.tooltip = { trigger: 'item' };
    option.legend = { data: ["频率","时长"] };
    option.legend.orient = 'horizontal'; option.legend.top = 0;
    option.grid = { top: 90, right: 70, bottom: 24, left: 40, containLabel: true };
    
    option.xAxis = [{ 
      type: 'category', 
      boundaryGap: true, 
      data: xAxisData, 
      axisTick: { show: false }, 
      axisLine: { show: false },
      axisLabel: { rotate: 0, interval: 0 },
      name: ''
    }];
    
    option.yAxis = [{ 
      type: 'value', 
      axisTick: { show: false }, 
      axisLine: { show: false }, 
      splitLine: { show: true, lineStyle: { color: 'rgba(0, 0, 0, .38)', type: 'dashed' } },
      name: '频率'
    }, { 
      type: 'value', 
      axisTick: { show: false }, 
      axisLine: { show: false }, 
      splitLine: { show: false },
      name: '时长'
    }];
    option.series = [{
        name: "频率", type: 'bar', stack: 'total',  smooth: false,  label: {"show":false,"position":"top"},  barWidth: 72, barGap: '30%',  z: 1,
        data: ((function(){ var cats = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })()); return cats; })().map(function(c){ return rows.filter(function(r){ return String(r["tag"])===c; }).length; }))
      },
{
        name: "时长", type: 'bar', stack: 'total', yAxisIndex:1, smooth: false,  label: {"show":false,"position":"top"},  barWidth: 72, barGap: '30%',  z: 1,
        data: ((function(){ var cats = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })()); function toNum(x){ if(x==null) return null; if(typeof x==='number') return isFinite(x)?x:null; if(typeof x==='boolean') return x?1:0; var s=String(x).trim(); if(!s) return null; s=s.replace(/,/g,''); var m=s.match(/^(-?\d+(?:\.\d+)?)(%)$/); if(m) return parseFloat(m[1])/100; var n=Number(s); return isNaN(n)?null:n; } return cats.map(function(c){ return rows.filter(function(r){ return String(r["tag"])===c; }).reduce(function(a,b){ var n=toNum(b["ial_custom-time"]); return a + (n==null?0:n); },0); }); })())
      }];
    
    
    
    try{ (option.series||[]).forEach(function(s, i){ if (s && s.type === 'pie') return; s.itemStyle = s.itemStyle || {}; s.itemStyle.color = ["#a9685b","#7e6da2"][i] || s.itemStyle.color; }); }catch(e){}
    
    
    option.animation = true;
    return option;
  })()
```
```echarts
(() => {
    function fetchSqlSync(sql){
      try{
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/api/query/sql', false);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify({stmt: sql}));
        if (xhr.status>=200 && xhr.status<300){
          var res = {};
          try { res = JSON.parse(xhr.responseText || '[]'); } catch { res = []; }
          var rows = Array.isArray(res) ? res : (res.data || []);
          return Array.isArray(rows) ? rows : [];
        }
      } catch(e){ /* ignore */ }
      return [];
    }
    
    // 数据预处理函数: box字段ID转name + 时间戳转换 + IAL解析
    function preprocessData(rows) {
      if (!rows || !rows.length) return rows;
      
      // 构建笔记本ID到name的映射表
      var notebooksMap = new Map();
      try {
        if (typeof window !== 'undefined' && window.siyuan && window.siyuan.notebooks) {
          window.siyuan.notebooks.forEach(function(nb) {
            notebooksMap.set(nb.id, nb.name);
          });
        }
      } catch(e) { console.warn('加载笔记本列表失败:', e); }
      
      // 时间戳转换函数
      function convertTimestamp(timestamp) {
        if (!timestamp) return timestamp;
        var ts = String(timestamp);
        
        // 验证格式: 14位数字 YYYYMMDDHHMMSS
        if (!/^\d{14}$/.test(ts)) return ts;
        
        try {
          var year = ts.substring(0, 4);
          var month = ts.substring(4, 6);
          var day = ts.substring(6, 8);
          var hour = ts.substring(8, 10);
          var minute = ts.substring(10, 12);
          var second = ts.substring(12, 14);
          
          // 返回标准格式: 2025-09-30 23:02:10
          return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        } catch(e) {
          return ts;
        }
      }
      
      // IAL解析函数
      function parseIAL(ial) {
        if (!ial || typeof ial !== 'string') return {};
        
        try {
          var content = ial.trim();
          if (content.startsWith('{:')) content = content.substring(2);
          if (content.endsWith('}')) content = content.substring(0, content.length - 1);
          content = content.trim();
          
          var result = {};
          var regex = /(\w[\w-]*)\s*=\s*"([^"]*)"/g;
          var match;
          
          while ((match = regex.exec(content)) !== null) {
            result[match[1]] = match[2];
          }
          
          return result;
        } catch(e) {
          return {};
        }
      }
      
      // 第一步: 处理每一行数据
      var processedRows = rows.map(function(row) {
        if (!row) return row;
        var processedRow = Object.assign({}, row);
        
        // 转换box字段
        if (processedRow.box && notebooksMap.has(processedRow.box)) {
          processedRow.box = notebooksMap.get(processedRow.box);
        }
        
        // 转换时间戳字段
        if (processedRow.created) {
          processedRow.created = convertTimestamp(processedRow.created);
        }
        if (processedRow.updated) {
          processedRow.updated = convertTimestamp(processedRow.updated);
        }
        
        // 解析IAL字段
        if (processedRow.ial) {
          var ialParsed = parseIAL(processedRow.ial);
          
          // 将IAL属性添加为新字段 (ial_ 前缀)
          Object.keys(ialParsed).forEach(function(key) {
            var fieldName = 'ial_' + key;
            var value = ialParsed[key];
            
            // 如果是时间戳格式,也进行转换
            if (/^\d{14}$/.test(value)) {
              processedRow[fieldName] = convertTimestamp(value);
            } else {
              processedRow[fieldName] = value;
            }
          });
          
          // 转为JSON字符串避免显示[object Object]
          processedRow.ial_parsed = JSON.stringify(ialParsed);
          processedRow.ial_keys = Object.keys(ialParsed).join(', ');
        }
        
        return processedRow;
      });
      
      // 第二步: 收集所有IAL字段并填充默认值
      var allIALKeys = [];
      processedRows.forEach(function(row) {
        Object.keys(row).forEach(function(key) {
          if (key.indexOf('ial_') === 0 && key !== 'ial_parsed' && key !== 'ial_keys') {
            if (allIALKeys.indexOf(key) === -1) {
              allIALKeys.push(key);
            }
          }
        });
      });
      
      // 为每一行填充缺失的IAL字段,默认值为 "无"
      if (allIALKeys.length > 0) {
        processedRows.forEach(function(row) {
          allIALKeys.forEach(function(key) {
            if (!(key in row)) {
              row[key] = '无';
            }
          });
        });
      }
      
      return processedRows;
    }
    
    const option = {};
    var rawRows = fetchSqlSync("select * from blocks WHERE markdown LIKE '%测试CC%'");
    const rows = preprocessData(rawRows);
    
    // 计算 X轴 数据
    const xAxisData = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })());
    
    option.title = { text: "" };
    option.title.left = "center"; option.title.top = 0; 
    option.backgroundColor = 'transparent';
    option.tooltip = { trigger: 'item' };
    option.legend = { data: ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })()) };
    option.legend.orient = 'horizontal'; option.legend.top = 0;
    option.grid = { top: 90, right: 70, bottom: 24, left: 40, containLabel: true };
    
    
    option.series = [{
        name: "频率", type: 'pie',   smooth: false,  label: {"show":true,"position":"inside"},   radius: ['30%', '50%'], z: 1,
        data: (function(){
          var ys = ((function(){ var cats = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })()); return cats; })().map(function(c){ return rows.filter(function(r){ return String(r["tag"])===c; }).length; }));
          if (Array.isArray(ys) && ys.length && typeof ys[0]==='object' && ys[0] && Object.prototype.hasOwnProperty.call(ys[0], 'value')) return ys;
          var xs = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })());
          var m = Math.min(xs.length, Array.isArray(ys)?ys.length:0);
          return xs.slice(0,m).map(function(n,i){ return { name: String(n), value: ys[i] }; });
        })()
      },
{
        name: "时长", type: 'pie',  yAxisIndex:1, smooth: false,  label: {"show":true,"position":"inside"},   radius: ['50%', '70%'], z: 1,
        data: (function(){
          var ys = ((function(){ var cats = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })()); function toNum(x){ if(x==null) return null; if(typeof x==='number') return isFinite(x)?x:null; if(typeof x==='boolean') return x?1:0; var s=String(x).trim(); if(!s) return null; s=s.replace(/,/g,''); var m=s.match(/^(-?\d+(?:\.\d+)?)(%)$/); if(m) return parseFloat(m[1])/100; var n=Number(s); return isNaN(n)?null:n; } return cats.map(function(c){ return rows.filter(function(r){ return String(r["tag"])===c; }).reduce(function(a,b){ var n=toNum(b["ial_custom-time"]); return a + (n==null?0:n); },0); }); })());
          if (Array.isArray(ys) && ys.length && typeof ys[0]==='object' && ys[0] && Object.prototype.hasOwnProperty.call(ys[0], 'value')) return ys;
          var xs = ((()=>{ var arr = (Array.from(new Set(rows.map(function(r){ var xv = r["tag"]; return String(xv); })))).slice(); arr.sort(function(a,b){ if(a===b) return 0; return (a>b?1:-1)*1; }); return arr; })());
          var m = Math.min(xs.length, Array.isArray(ys)?ys.length:0);
          return xs.slice(0,m).map(function(n,i){ return { name: String(n), value: ys[i] }; });
        })()
      }];
    
    
    
    
    option.animation = true;
    return option;
  })()
```

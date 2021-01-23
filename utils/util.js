const parse = function(timeStr) {
  let tempArr = timeStr.split(':')
  return tempArr[0] * 60 + Math.ceil(tempArr[1])
}

const getTimeStampArr = function(str) {
  return str.match(/\[\d{2}:\d{2}.\d{2,}\]/g).map(item => {
    return parse(item.replace(/\[/g, '').replace(/\]/g, ''))
  })
} 

const getLyricArr = function(str) {
  return str.replace(/\[\d{2}:\d{2}.\d{2,}\]/g, '').split(/\n/g)
}

const getLyricAndTimeList = function(str) {
  let temp = []
  let lyricArr = getLyricArr(str)
  let timeArr = getTimeStampArr(str)
  lyricArr.forEach((element, index) => {
    if(!element) return
    let obj = {}
    obj.time = timeArr[index]
    obj.text = element
    temp.push(obj)
    obj = null
  });
  return temp
}
export {
  parse,
  getTimeStampArr,
  getLyricArr,
  getLyricAndTimeList
}
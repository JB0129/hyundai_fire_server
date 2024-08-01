const fs = require("fs");

// file path
const path = require("path");
const filePath = path.join(path.resolve(), "data", "noticeData.json");

module.exports = {
  getNotices: (req, res) => {
    // json 파일 읽기
    const fileData = fs.readFileSync(filePath);
    const noticeData = JSON.parse(fileData);

    // 결과
    return res.status(200).json(noticeData);
  },

  getNotice: (req, res) => {
    // json 파일 읽기
    const fileData = fs.readFileSync(filePath);
    const noticeData = JSON.parse(fileData);

    // data 필터링
    const id = req.params.id;
    const data = noticeData.filter((el) => el.id === id);

    // 결과
    if (data.length) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json("일치하는 데이터가 없습니다.");
    }
  },

  postNotice: (req, res) => {
    if (req.body) {
      // json 파일 읽기
      const fileData = fs.readFileSync(filePath);
      const noticeData = JSON.parse(fileData);

      // data 추가하기
      const { title, contents } = req.body;

      const newId = !noticeData.length
        ? 0
        : noticeData[noticeData.length - 1].id + 1;

      const newData = {
        id: newId,
        title: title,
        contents: contents,
      };

      noticeData.push(newData);
      fs.writeFileSync(filePath, JSON.stringify(noticeData));

      // 결과
      return res.status(201).json(noticeData);
    }
  },

  patchNotice: (req, res) => {
    if (req.body) {
      // json 파일 읽기
      const fileData = fs.readFileSync(filePath);
      const noticeData = JSON.parse(fileData);

      // data 수정하기
      const id = req.params.id;
      const { title, contents } = req.body;
      const newData = { title: title, contents: contents };
      const patchedData = noticeData.map((el) => {
        if (el.id === id) return { ...el, ...newData };
      });
      fs.writeFileSync(filePath, JSON.stringify(patchedData));

      // 결과
      return res.status(201).json(patchedData);
    }
  },

  deleteNotice: (req, res) => {
    if (req.body) {
      // json 파일 읽기
      const fileData = fs.readFileSync(filePath);
      const noticeData = JSON.parse(fileData);

      // data 삭제하기
      const id = req.params.id;
      const deletedData = noticeData.filter((el) => el.id !== id);
      fs.writeFileSync(filePath, JSON.stringify(deletedData));

      // 결과
      if (deletedData.length) {
        return res.status(200).json(deletedData);
      } else {
        return res.status(404).json("일치하는 데이터가 없습니다.");
      }
    }
  },
};

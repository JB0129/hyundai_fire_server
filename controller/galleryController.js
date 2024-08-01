const fs = require("fs");

// file path
const path = require("path");
const filePath = path.join(path.resolve(), "data", "galleryData.json");

module.exports = {
  getGallerys: (req, res) => {
    // json 파일 읽기
    const fileData = fs.readFileSync(filePath);
    const galleryData = JSON.parse(fileData);

    const { page } = req.query;

    const data = galleryData.slice(6 * (page - 1), 6 * page);
    console.log(data);

    const response = {
      data: data,
      totalPage: Math.ceil(galleryData.length / 6),
    };

    // 결과
    return res.status(200).json(response);
  },

  getGallery: (req, res) => {
    // json 파일 읽기
    const fileData = fs.readFileSync(filePath);
    const galleryData = JSON.parse(fileData);
    console.log(typeof galleryData[0].id);

    // data 필터링
    const id = req.params.id;
    const data = galleryData.filter((el) => el.id === Number(id));
    const index = galleryData.findIndex((el) => el.id === Number(id));
    const prev = galleryData[index - 1];
    const next = galleryData[index + 1];

    // 결과
    if (data.length) {
      const response = {
        data: data[0],
        pageInfo: {
          prev: prev,
          next: next,
        },
      };
      return res.status(200).json(response);
    } else {
      return res.status(404).json("일치하는 데이터가 없습니다.");
    }
  },

  postGallery: (req, res) => {
    if (req.body) {
      // json 파일 읽기
      const fileData = fs.readFileSync(filePath);
      const galleryData = JSON.parse(fileData);

      // data 추가하기
      const { title, contents, image } = req.body;

      const newId = !galleryData.length
        ? 0
        : galleryData[galleryData.length - 1].id + 1;

      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      const createDate = year + "-" + month + "-" + day;

      const newData = {
        id: newId,
        title: title,
        contents: contents,
        images: [image],
        createDate: createDate,
      };

      galleryData.push(newData);
      fs.writeFileSync(filePath, JSON.stringify(galleryData));

      // 결과
      return res.status(201).json(newId);
    }
  },

  addGallery: (req, res) => {
    if (req.body) {
      // json 파일 읽기
      const fileData = fs.readFileSync(filePath);
      const galleryData = JSON.parse(fileData);

      // image 추가하기
      const id = req.params.id;
      const { image } = req.body;

      const addImage = galleryData.map((el) => {
        if (el.id === Number(id))
          return { ...el, images: [...el.images, image] };
      });
      fs.writeFileSync(filePath, JSON.stringify(addImage));

      // 결과
      return res.status(201).json(id);
    }
  },

  patchGallery: (req, res) => {
    if (req.body) {
      // json 파일 읽기
      const fileData = fs.readFileSync(filePath);
      const galleryData = JSON.parse(fileData);

      // data 수정하기
      const id = req.params.id;
      const { title, contents } = req.body;
      const newData = { title: title, contents: contents };
      const patchedData = galleryData.map((el) => {
        if (el.id === id) return { ...el, ...newData };
      });
      fs.writeFileSync(filePath, JSON.stringify(patchedData));

      // 결과
      return res.status(201).json(patchedData);
    }
  },

  deleteGallery: (req, res) => {
    if (req.body) {
      // json 파일 읽기
      const fileData = fs.readFileSync(filePath);
      const galleryData = JSON.parse(fileData);

      // data 삭제하기
      const id = req.params.id;
      const deletedData = galleryData.filter((el) => el.id !== Number(id));
      fs.writeFileSync(filePath, JSON.stringify(deletedData));

      // 결과
      if (deletedData.length) {
        return res.status(200).json();
      } else {
        return res.status(404).json("일치하는 데이터가 없습니다.");
      }
    }
  },
};

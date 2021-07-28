# VN Public APIs

VN Public APIs là tập hợp các API miễn phí giúp bạn có thể lấy được các thông tin công khai một cách dễ dàng.


## API Reference

#### 1. Lấy danh sách Tỉnh / Thành phố (Thành phố trực thuộc Trung ương)

```
  GET /provinces/getAll
```

Run Demo tại [HTTPie](https://httpie.io/run) với script:
```
http -v https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1
http -v https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1&q=ninh&cols=name,name_with_type
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `q` | `string` | _Optional_ Từ khoá tìm kiếm. VD: `ninh` |
| `cols` | `string` | _Optional_ Tên cột muốn tìm kiếm, không dùng khoảng trắng (space). `Cols` khả dụng: `name`, `slug`, `type`, `name_with_type`, `code`. VD: `name,name_with_type` |
| `page` | `string` | _Optional_ Dùng cho nhu cầu phân trang (pagination). |
| `limit` | `string` | _Optional_ Số lượng item / trang. Nhập `-1` để lấy toàn bộ danh sách. |

#### 2. Lấy danh sách Quận / Huyện / Thị xã / Thành phố (trực thuộc tỉnh)

```
  GET /districts/getAll
```

Run Demo tại [HTTPie](https://httpie.io/run) với script:
```
http -v https://vn-public-apis.fpo.vn/districts/getAll?limit=-1
http -v https://vn-public-apis.fpo.vn/districts/getAll?limit=-1&q=ninh&cols=name,name_with_type
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `q` | `string` | _Optional_ Từ khoá tìm kiếm. VD: `ninh` |
| `cols` | `string` | _Optional_ Tên cột muốn tìm kiếm, không dùng khoảng trắng (space). `Cols` khả dụng: `name`, `slug`, `type`, `name_with_type`, `code`. VD: `name,name_with_type` |
| `page` | `string` | _Optional_ Dùng cho nhu cầu phân trang (pagination). |
| `limit` | `string` | _Optional_ Số lượng item / trang. Nhập `-1` để lấy toàn bộ danh sách. |

#### 3. Lấy danh sách Quận / Huyện / Thị xã / Thành phố (trực thuộc tỉnh) theo Tỉnh / Thành phố (Thành phố trực thuộc Trung ương)

```
  GET /districts/getByProvince
```

Run Demo tại [HTTPie](https://httpie.io/run) với script:
```
http -v https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=72
http -v https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=72&limit=-1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| **`provinceCode`** | `string` | **Required** Mã của tỉnh / thành phố (trực thuộc trung ương). VD: `provinceCode=72` |
| `q` | `string` | _Optional_ Từ khoá tìm kiếm. VD: `ninh` |
| `cols` | `string` | _Optional_ Tên cột muốn tìm kiếm, không dùng khoảng trắng (space). `Cols` khả dụng: `name`, `slug`, `type`, `name_with_type`, `code`. VD: `name,name_with_type` |
| `page` | `string` | _Optional_ Dùng cho nhu cầu phân trang (pagination). |
| `limit` | `string` | _Optional_ Số lượng item / trang. Nhập `-1` để lấy toàn bộ danh sách. |

#### 4. Lấy danh sách Phường / Xã / Thị trấn / Thôn / Đội

```
  GET /wards/getAll
```

Run Demo tại [HTTPie](https://httpie.io/run) với script:
```
http -v https://vn-public-apis.fpo.vn/wards/getAll?limit=-1
http -v https://vn-public-apis.fpo.vn/wards/getAll?limit=-1&q=ninh&cols=name,name_with_type
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `q` | `string` | _Optional_ Từ khoá tìm kiếm. VD: `ninh` |
| `cols` | `string` | _Optional_ Tên cột muốn tìm kiếm, không dùng khoảng trắng (space). `Cols` khả dụng: `name`, `slug`, `type`, `name_with_type`, `code`. VD: `name,name_with_type` |
| `page` | `string` | _Optional_ Dùng cho nhu cầu phân trang (pagination). |
| `limit` | `string` | _Optional_ Số lượng item / trang. Nhập `-1` để lấy toàn bộ danh sách. |

#### 5. Lấy danh sách Phường / Xã / Thị trấn / Thôn / Đội theo Quận / Huyện / Thị xã / Thành phố (trực thuộc tỉnh)

```
  GET /wards/getByDistrict
```

Run Demo tại [HTTPie](https://httpie.io/run) với script:
```
http -v https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=712
http -v https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=712&limit=-1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| **`districtCode`** | `string` | **Required** Mã của Quận / Huyện / Thị xã / Thành phố (trực thuộc tỉnh). VD: `districtCode=712` |
| `q` | `string` | _Optional_ Từ khoá tìm kiếm. VD: `ninh` |
| `cols` | `string` | _Optional_ Tên cột muốn tìm kiếm, không dùng khoảng trắng (space). `Cols` khả dụng: `name`, `slug`, `type`, `name_with_type`, `code`. VD: `name,name_with_type` |
| `page` | `string` | _Optional_ Dùng cho nhu cầu phân trang (pagination). |
| `limit` | `string` | _Optional_ Số lượng item / trang. Nhập `-1` để lấy toàn bộ danh sách. |

## Author
**Dương Trần Hà Phương (Mr.)** - CEO [Công ty TNHH FPO](https://fpo.vn)
- Email: [phuongduong@fpo.vm](mailto:phuongduong@fpo.vm)
- Website: [https://phuongduong.fpo.vn](https://phuongduong.fpo.vn)
- Gitlab: [@dthphuong1](https://gitlab.com/dthphuong1)
- Github: [@dthphuong](https://github.com/dthphuong)



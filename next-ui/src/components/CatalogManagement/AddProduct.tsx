'use client';

import React, { useState } from 'react';
import { IProduct } from '@/utils/interface/product';
import { Button, Col, Image, Input, Row, Select, Space, message } from 'antd';
import moment from 'moment';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import _ from 'lodash';
import { useCreateProductMutation } from '@/redux/action/javaProduct';
import { useRouter } from 'next/navigation';

interface AddProductProps {
  ten_san_pham: string;
  mo_ta: string;
  img_hero: string;
  gia_ban: string;
  so_luong: string;
  hoadon_id: null | number;
  danhmucsp_id: number;
  ngay_tao: string;
}

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState<AddProductProps>({
    ngay_tao: moment().format('DD/MM/YYYY'),
    hoadon_id: null,
    danhmucsp_id: 3,
  } as AddProductProps);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickAdd = () => {
    const { ten_san_pham, so_luong, gia_ban } = newProduct;
    if (_.isEmpty(ten_san_pham) || _.isEmpty(so_luong) || _.isEmpty(gia_ban)) {
      message.error('Product Name, Product Price, Product Amount is required');
      return;
    }
    createProduct(newProduct)
      .unwrap()
      .then((res) => {
        message.success('Add product successfully');
        router.back();
      })
      .catch((err) => {
        message.error('Add product failed');
      });
  };

  return (
    <Space direction='vertical' className={clsx(style.add__product__container)} size={46}>
      <Row className={clsx(style.header)}>
        <Col span={8} className={clsx(style.header_title)}>
          <div>Add New Product</div>
        </Col>
        <Col span={16} className={clsx(style.header_btn)}>
          <Button>Cancel</Button>
          <Button type='primary' onClick={handleClickAdd}>
            Add Product
          </Button>
        </Col>
      </Row>
      <Row className={clsx(style.content)}>
        <Col span={11}>
          <Row className={clsx(style.add__field)}>
            <Col span={24} className={clsx(style.add_title)}>
              <div>Base Information</div>
            </Col>
            <Col span={24} className={style.add_info}>
              <div className={clsx(style.input_field)}>
                <div>
                  <p>Product Name</p>
                  <Input required name='ten_san_pham' onChange={onInputChange} />
                </div>
                <div>
                  <p>Product Description</p>
                  <Input name='mo_ta' onChange={onInputChange} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className={clsx(style.add__field)}>
            <Col span={24} className={clsx(style.add_title)}>
              <div>Images</div>
            </Col>
            <Col span={24} className={style.add_info}>
              <div>
                <p style={{ marginBottom: 8 }}>Link Image</p>
                <Input name='img_hero' onChange={onInputChange} />
              </div>
            </Col>
          </Row>
          <Row className={clsx(style.add__field)}>
            <Col span={24} className={clsx(style.add_title)}>
              <div>Details Information</div>
            </Col>
            <Col span={24} className={style.add_info}>
              <div className={clsx(style.input_field)}>
                <div>
                  <p>Product Price</p>
                  <Input required name='gia_ban' onChange={onInputChange} />
                </div>
                <div>
                  <p>Product Amount</p>
                  <Input required name='so_luong' onChange={onInputChange} />
                </div>
                <div>
                  <p style={{ marginBottom: 8 }}>Select Catalog</p>
                  <Select
                    defaultValue={'3'}
                    onSelect={(e) => setNewProduct((prevState) => ({ ...prevState, catalog: parseInt(e) }))}
                    placeholder='Select catalog of product'
                  >
                    <Select.Option value='1'>Exclusive product</Select.Option>
                    <Select.Option value='2'>Limited product</Select.Option>
                    <Select.Option value='3'>Mass Market Product</Select.Option>
                  </Select>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={2}></Col>
        <Col span={11} className={clsx([style.add__field, style.preview_field])}>
          <div className={clsx([style.add_title, style.preview_title])}>Preview</div>
          <div className={clsx(style.preview__info)}>
            <Image
              src={
                !_.isEmpty(newProduct.img_hero)
                  ? newProduct.img_hero
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWVctaO3VjRAsLTVO1N7CdZzIccDyT1ZBTfHgB8VJqeA&s'
              }
              alt='Image not available'
              width={400}
              className={clsx(style.image)}
            />
            <div className={clsx(style.name)}>
              {!_.isEmpty(newProduct.ten_san_pham) ? newProduct.ten_san_pham : 'Product Name'}
            </div>
            <ul className={style.base}>
              <li style={{ textOverflow: 'clip' }}>
                Product Description: <br /> {newProduct.mo_ta}
              </li>
              <li>
                Product Price: <br /> {newProduct.gia_ban}
              </li>
              <li>
                Product Amount: <br /> {newProduct.so_luong}
              </li>
              <li>
                Catalog: <br />{' '}
                {newProduct.danhmucsp_id === 1
                  ? 'Exclusive product'
                  : newProduct.danhmucsp_id === 2
                  ? 'Limited product'
                  : 'Mass Market Product'}
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Space>
  );
};

export default AddProduct;

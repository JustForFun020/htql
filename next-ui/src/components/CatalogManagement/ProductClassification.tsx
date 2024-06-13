'use client';

import _ from 'lodash';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../Loading';
import { Button, Divider, Select, Space } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { classification } from '../../../__mock__/classification';
import { useLazyClassificationCatalogQuery } from '@/redux/action/catalogApi';

const ListProduct = dynamic(() => import('../ListProduct'), { loading: () => <Loading />, ssr: false });

const ProductClassification = () => {
  const [listClassification, setListClassification] = useState<{ criterion: string; name: string }[]>([]);

  const [classificationCatalog, { isLoading, data }] = useLazyClassificationCatalogQuery();

  const handleClickFilter = () => {
    classificationCatalog({
      listCriteria: listClassification,
    });
  };

  const handleSelectCriterion = (criterion: string, name: string) => {
    const chooseCriterion = { criterion, name };
    const index = _.findIndex(listClassification, { criterion });
    if (index !== -1) {
      setListClassification((prev) => {
        prev[index] = chooseCriterion;
        return [...prev];
      });
    } else {
      setListClassification((prev) => [...prev, chooseCriterion]);
    }
  };

  return (
    <Space className={clsx(style.prod__classification__provider)} direction='vertical'>
      <div className={clsx(style.title)}>
        <h3>Product Classification</h3>
        <i>
          View detailed product information and classify items with ease. Organize your inventory efficiently using our
          comprehensive classification tools.
        </i>
      </div>
      <Divider />
      <Space style={{ width: '100%' }}>
        {_.map(classification, (item, index) => (
          <div>
            <span>{item.criterion}:</span>{' '}
            <Select
              placeholder={item.subCriterion[0].name}
              onSelect={(values) => {
                handleSelectCriterion(item.criterion, values.toString());
              }}
            >
              {item.criterion}:
              {_.map(item.subCriterion, (subCriterion) => (
                <Select.Option value={subCriterion.name}>{subCriterion.name}</Select.Option>
              ))}
            </Select>
          </div>
        ))}
        <Button onClick={handleClickFilter} type='primary'>
          Filter
        </Button>
        <Button onClick={() => setListClassification([])}>Clear</Button>
      </Space>
      <ListProduct dataFromProps={!_.isEmpty(listClassification) && data} />
    </Space>
  );
};

export default ProductClassification;

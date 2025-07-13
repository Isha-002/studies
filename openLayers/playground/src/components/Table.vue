<script setup lang="ts">
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons-vue'
import { Table, Input, Button, Space, type TableColumnType } from 'ant-design-vue'
import { h, ref } from 'vue'

interface RowData {
  key: string
  name: string
  title: string
  action: string
}



const editingKey = ref('')
const isEditing = (data: RowData) => data.key === editingKey.value


const dataSource = ref<RowData[]>([
  { key: '1', name: '1', title: '222', action: '' },
  { key: '2', name: '13', title: '222', action: '' },
  { key: '3', name: '132', title: '222', action: '' },
  { key: '4', name: '1324', title: '222', action: '' },
  { key: '5', name: '13245', title: '222', action: '' },
  { key: '6', name: '13246', title: '222', action: '' },
])

const edit = (data: RowData) => {
  editingKey.value = data.key
}
const save = () => {
  editingKey.value = ''
}
const delete_value = (data: RowData) => {
    const newData = [...dataSource.value]
    const index = newData.findIndex(item => item.key === data.key)
    if (index !== -1) {
      newData.splice(index, 1)
      dataSource.value = newData
    }
  }



const handleInputChange = (e: Event, data: RowData, column: keyof RowData) => {
  const newData = [...dataSource.value]
  const index = newData.findIndex(item => item.key === data.key)
  if (index !== -1) {
    newData[index][column] = e.target.value 
    dataSource.value = newData
  }
}

const columns: TableColumnType[] = [
  {
    title: 'اسم فیلد',
    dataIndex: 'name',
    key: 'name',
    customRender: ({ text , record }: { text: string; record: RowData }) => {
      return isEditing(record)
        ? h(Input, {
            value: record.name,
            style: {
            width: '100%',
            padding: '2px 6px',
          },
            onChange: (e) => handleInputChange(e, record, 'name'),
          })
        : text
    },
    width: 150
  },
  {
    title: 'عنوان',
    dataIndex: 'title',
    key: 'title',
    customRender: ({ text, record } : { text: string; record: RowData }) => {
      return isEditing(record)
        ? h(Input, {
            value: record.title,
            style: {
            width: '100%',
            padding: '2px 6px',
          },
            onChange: (e) => handleInputChange(e, record, 'title'),
          })
        : text
    },
    width: 150,

  },
  {
    title: 'عملیات',
    key: 'action',
    customRender: ({ record } : { record: RowData }) => {
      return isEditing(record)
        ? h(Space, null, {
            default: () => [
              h(Button, { icon: h(SaveOutlined), type: 'link', onClick: () => save() }),
            ],
          })
        : [
            h(Button, { icon: h(EditOutlined), type: 'link', onClick: () => edit(record) }),
            h(Button, { icon: h(DeleteOutlined), type: 'link', onClick: () => delete_value(record) }),
          ]
    },
  },
]
</script>






<template>
  <Table 
  :columns="columns" 
  :data-source="dataSource" 
  :pagination="{ position: ['bottomCenter'], defaultPageSize: 3, hideOnSinglePage: true }"
  size ="small"
  /> 
</template>



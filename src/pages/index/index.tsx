import { useState} from 'react'
import { View, Button, Text } from '@tarojs/components'

import './index.css'

export default function Index(){
  const [count, setCount]=useState(0)
  return (
    <View className='index'>
      <Button onClick={()=> setCount(count+1)}>+</Button>
      <Button onClick={()=> setCount(count-1)}>-</Button>
      <Text>{count}</Text>
    </View>
  )
}

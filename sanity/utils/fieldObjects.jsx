export const SmallCapsIcon = () => {
  return <span style={{fontSize: '12px'}}>SM</span>
}

export const SmallCapsDecorator = (props) => {
  return <span style={{fontVariant: 'small-caps'}}>{props.children}</span>
}

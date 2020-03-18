<script>
export default {
  name: 'menu-item',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    console.log('icon: ', icon);
    const vnodes = [];
    if (icon) {
      vnodes.push(<i class={icon}></i>);
    }
    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>

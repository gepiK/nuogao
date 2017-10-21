<script>
export default {
  render(h) {
    const renderCell = option => {
      const { rule, row, $index } = option;
      row.$index = $index;
      if (rule.sloted) {
        return (
          <div class={getCellClass(rule.align)} style={getCellStyle(rule)}>
            {
              rule.$slot(row)
            }
          </div>
        );
      } else {
        return (
          <div class={getCellClass(rule.align)} style={getCellStyle(rule)}> 
          {
            row[rule.prop]
          }
          </div>
        )
      }
    };
    const getCellClass = align => `cell cell-${align}`;
    const getCellStyle = rule => `padding-left:${rule.tdPaddingLeft}px;padding-right:${rule.tdPaddingRight}px;min-width:${rule.minWidth}px;`;
    const getTdWidth = width => {
      if (width.indexOf('%') > -1) {
        return `width:${width};`;
      } else {
        return `width:${width}px;`;
      }
    }
    // 获取td的最小宽度，只能传入数字
    const getTdMinWidth = minWidth => {
        return `;min-width:${minWidth}px;`;
    }
    const tableCls = `data-table table-theme__${this.theme}`;
    const getTbodyHeight = height => {
      return `height:${height}px;`;
    };
    return (
      <div class={tableCls} style='width:100%'>
        <div class='table-header'>
          <table>
            <thead>
              <tr>
                {
                  this._l(this.rules, (rule, $index) =>
                    <td key={$index} style={rule.width ? getTdWidth(rule.width) : null}>
                      <div class={getCellClass(rule.align)} style={getCellStyle(rule)}>{rule.label}</div>
                    </td>
                  )
                }
              </tr>
            </thead>
          </table>
        </div>
        <div class='table-body' style={this.height ? getTbodyHeight(this.height) : null}>
          <table>
            <tbody>
              {
                this._l(this.data, (row, $index) =>
                  <tr key={$index}
                    on-click={($event) => this.handleClick($event, row, $index)}>
                    {
                      this._l(this.rules, (rule, $tdIndex) =>
                        <td key={$tdIndex} style={rule.width ? getTdWidth(rule.width) : null} class={rule.wall === 'true' ? 'wall' : null}>
                          {renderCell({ rule, row, $index })}
                        </td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
          {
            this.data.length == 0?
            <div class='empty'>
              <div class='empty-img'>
              </div>
              <div class='empty-text'>
                {
                  this.$slots.empty?
                    this.$slots.empty
                    : 
                    '当前暂无数据'
                }
              </div>
            </div>:
            null
          }
          {
            this.$slots.tips ? this.$slots.tips : null
          }
        </div>
        {this.$slots.default}
      </div>
    )
  },

  mounted() {
    this.rules = [];
    this.$children.forEach((child) => {
      let temp = { ...child._props };
      if (child._props.sloted) {
        temp.$slot = child.$scopedSlots.default;
      }

      this.rules.push(temp);
    });
  },

  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    theme: {
      type: String,
      default: 'default'
    },
    height: {
      type: [String,Number]
    }
  },

  methods: {
    handleClick(event, row, index) {
      this.$emit('row-click', event, row, index);
    }
  },

  data: () => ({
    rules: []
  })
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
  color: #666;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.data-table {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: rgb(31, 45, 61);

  thead td {
    height: 50px;
    color: #777;
    border-bottom: 1px solid #EBEAE6;
    background-color: #ebebeb;
  }
  tbody tr {
    &:hover {
      background-color: #F0FBFF;
    }
  }
  tbody td {
    height: 100px;
    border-bottom: 1px solid #F0F1F5;

    &.wall+.wall::after {
      content: ' ';
      border-right: 1px solid #F0F1F5;
      height: 69%;
      position: absolute;
      top: 16%;
    }
  }
  td {
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }
  .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 24px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    &.cell-center {
      justify-content: center;
      text-align: center;
    }
  }
}

.table-theme__default {
  .empty {
    text-align: center;
    padding: 120px 0;
    .empty-img {
      height: 130px;
      background-image: url(../../assets/icon-blank01.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 11% 130%;
    }
    .empty-text {
      color: #54565F;
      font-size: 16px;
    }
  }
}

.table-theme__dialog {
  .empty {
    text-align: center;
    padding: 100px 0;
    .empty-text {
      color: #54565F;
      font-size: 20px;
    }
  }
  thead td {
    border-bottom: none;
    background-color: #F5F5F5;
    color: #777777;
    height: 40px;
  }
  .table-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid #F0F1F5;
    border-right: 1px solid #F0F1F5;
    border-bottom: 1px solid #F0F1F5;
    border-radius: 4px;
    min-height: 200px;
    overflow-y: auto;
    tbody td {
      height: 45px;
    }
  }
  .table-tips {
    width: 100%;
    text-align: center;
    color: #aaaaaa;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
  }
}
</style>

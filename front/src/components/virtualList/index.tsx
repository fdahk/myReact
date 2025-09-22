import style from './index.module.scss'
import VirtualList  from './virtualList';
function Index() {
    const listData = Array.from({length: 10000}, (_, index) => {return {id: index, content: index} })
    return (
        <div className={style.container}>
            <div className={style.box}>
                <VirtualList 
                scrollWidth={400}
                data={listData}
                scrollHeight={800}
                itemHeight={50}
                bufferSize={10}
                getItemKey= {(item) => item.id }
                renderItem= {(item, id) => {
                    return (
                        <div key={id} style={{width: "100%", height: 50, backgroundColor:"green"}}>
                             { item.content } 
                        </div>
                    )
                }}
                />
            </div>
        </div>
    )
}

export default Index;
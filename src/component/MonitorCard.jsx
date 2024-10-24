// Cardコンポーネントの定義
export const MonitorCard = (props) => {

    const isCompleted = props.status === '完了'; // ステータスが「完了」かどうか

    return (
        <div className={`monitor-card ${isCompleted ? 'glow' : ''}`} id={props.id}>
            <h2>
                注文ID<span className="monitor-card_id">{props.userid}</span>
            </h2>
            <div className="monitor-bar">
                <p>ユーザー名: {props.username}</p>
                <p>受信時間: {new Date(props.timestamp).toLocaleString()}</p>
            </div>
        </div>
    );
};


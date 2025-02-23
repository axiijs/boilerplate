import {atom, RenderContext, RxList} from "axii";
import {Input, Button} from "axii-ui";
import {styleSystem as s} from "axii-ui-theme-inc";

export function App({}, {createElement}: RenderContext)  {
    const name = atom<string>('')
    const subjectName = atom<string>('')
    const score = atom<string>('0')

    const subjects = new RxList<{name:string, score:number}>([{name:'swim', score: 100}, {name:'run', score: 90}])
    const addSubject = () => {
        subjects.push({name: subjectName(), score: parseInt(score()!, 10)})
        subjectName('')
        score(0)
    }

    return (
        <div style={s.layout.column({gap:10})}>
            <span style={s.heading()}>Hello {name}</span>
            <div>
                <Input value={name} placeholder="input your name"/>
            </div>
            <div style={s.layout.row({gap:10})}>
                <Input value={subjectName} placeholder="Subject name"/>
                <Input $main:type='number' value={score} placeholder="Score"/>
                <Button $root:onClick={addSubject}>Submit</Button>
            </div>

            <div style={s.table()}>
                <table >
                    <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Score</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subjects.map((subject, index) => (
                        <tr>
                            <td>{subject.name}</td>
                            <td>{subject.score}</td>
                            <td>
                                <Button $root:style={s.textBox({colorBox:true, color:s.colorScheme.error})} $root:onClick={() => subjects.splice(index.raw, 1)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div style={s.layout.row({gap:20})}>
                <div style={s.mainText}>Total Subjects: {subjects.length}</div>
                <div>Total Score: {subjects.reduceToAtom<number>((last, current) => {
                    console.log(last, current.score, last + current.score)
                    return last + current.score
                }, 0)}</div>
            </div>
        </div>
    )
}

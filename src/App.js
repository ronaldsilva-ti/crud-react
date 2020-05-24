import React,{useState} from 'react';
import shortid from 'shortid'


function App() {

  const [tarefa,SetTarefa] = useState('');
  const [tarefas,SetTarefas] = useState([]);
  const [modoEdicao,SetmodoEdicao] = useState(false);
  const [id,setId] = useState('');
  const [error,setErro] = useState(null);

  const agregarTarefa = e => {
      e.preventDefault();   

      //Validar campo
      if(!tarefa.trim()){
        console.log('Tarefa vazia');
        setErro('Escreva algo por favor');
        return;
      }    

      //Adicionar Tarefa 
      SetTarefas([
        ...tarefas,
      {
        id:shortid.generate(),
        nomeTarefa:tarefa
      }
    ])

      //Resetar campos
      SetTarefa('');
      setErro(null);
  }


    //Eliminar Tarefa
    const eliminar = id => {      
       
      const filtrarArray = tarefas.filter(item => item.id !== id);
      SetTarefas(filtrarArray);

    }



    //Pegar item para editar
    const editar = item => { 
      SetmodoEdicao(true);
      SetTarefa(item.nomeTarefa);
      setId(item.id);
    }



    //Modo edição de tarefas
    const editarTarefa = e => {
      e.preventDefault();

      //Validar
      if(!tarefa.trim()){
        console.log('Tarefa vazia');
        setErro('Escreva algo por favor');
        return;
      }

      const arrayEditado = tarefas.map(
        item => item.id === id ? {id,nomeTarefa:tarefa} : item
        )
        //Passar o valor
        SetTarefas(arrayEditado);

        //Resetar 
        SetmodoEdicao(false);
        SetTarefa('');
        setId(''); 
        setErro(null); 
    }



  return (
    <div className="container mt-r">
        <h1 className="text-center">CRUD Simples</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
            <h4 className="text-center">
            {
              modoEdicao ? 'Editar Tarefa' : 'Inserir Tarefa'
            }
            </h4>   
              <ul className="list-group">
                {
                  tarefas.length === 0 ? (
                    <li className="list-group-item">
                      Não há tarefas
                    </li>

                  ):
                  (                    
                      tarefas.map(item => (
                      <li className="list-group-item" key={item.id}>
                        <span className="lead">{item.nomeTarefa}</span>
                          <button
                                 className="btn btn-danger btn-sm float-right mx-2"
                                 onClick={() => eliminar(item.id)}>
                              Eliminar
                          </button>
                          <button 
                              className="btn btn-warning btn-sm float-right"
                              onClick={() => editar(item)}>
                              Editar
                          </button>
                      </li>
                      
                      ))                 


                  )
                }    



              </ul>     
        </div>
        <div className="col-4">
            <h4 className="text-center">
                Formulario
            </h4>  
            <form
              onSubmit={modoEdicao ? editarTarefa : agregarTarefa}
            >

                {error ? <span className="text-danger">{error}</span> : null }

              <input 
                  type="text" 
                  className="form-control mb-2"
                  placeholder="Informe a tarefa"
                  onChange={e => SetTarefa(e.target.value)}
                  value={tarefa}
              />

                  {modoEdicao ? (
                    <button type="submit" className="btn btn-warning btn-block">
                        Editar              
                    </button>

                  ) :
                  (
                    <button type="submit" className="btn btn-dark btn-block">
                      Adicionar Tarefa              
                    </button>              
                  )
                
                }


            
            
            </form>
        
        </div>
      
      </div>

    </div>
  );
}

export default App;

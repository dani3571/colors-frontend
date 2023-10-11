"use client"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function fethData() {

  try {
    const response = await fetch('https://localhost:7040/api/WeatherForecast/');
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

export default async function Home() {
  const api = await fethData();
  const contentColor = api[7].contentColor;
  const textColor = api[2].contentColor;

  // new reaction
  const onSubmit = async(e:any) => {
    // Para que no refresque la pagina
      e.preventDefault()
      // Asignamos a las variables title y descripcion lo que manda el formulario accediendo al target
      const reaccion = e.target.reaccion.value;
      console.log('Reacción a enviar:', reaccion);
      
      const res = await fetch('https://localhost:7040/api/WeatherForecast/CreateInteraction',{
        method: 'POST',
        body: JSON.stringify({reaccion}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div style={{ backgroundColor: contentColor }} className="p-40 rounded-2xl">
        <h1 style={{ color: textColor }} className="text-5xl font-bold">ES TU DIA DE SUERTE</h1>
      </div>
      <form onSubmit={onSubmit} className='flex justify-between gap-28'>
        <button id="reaccion" name="reaccion" value="Like" className='bg-blue-700 rounded-md text-white px-4 mt-4 text-4xl'> Me gusta </button>

        <button id="reaccion" name="reaccion" value="Dislike" className='bg-red-700 rounded-md text-white px-4 py-2 mt-4 text-4xl'> No me gusta </button>
      </form>

    </main>
  )
}

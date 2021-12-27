import { useState } from 'react';
import './Form.css'

function Form() {
   const [form, setForm] = useState({ 
      pregnacies: "",
      glucose: "",
      blood_pressure: "",
      skin_thickness: "",
      insulin_level: "",
      bmi: "",
      diabetes_pedigree: "",
      age: ""
   });

   const [result, setResult] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = (event) => {
      event.preventDefault();

      const form_data = new FormData();
      form_data.append("1", form.pregnacies);
      form_data.append("2", form.glucose);
      form_data.append("3", form.blood_pressure);
      form_data.append("4", form.skin_thickness);
      form_data.append("5", form.insulin_level);
      form_data.append("6", form.bmi);
      form_data.append("7", form.diabetes_pedigree);
      form_data.append("8", form.age);

      setLoading(true);

      fetch('https://dsmodeldeployment9.herokuapp.com/predict',{
         method:'POST',
         body: form_data
      })
         .then(response => response.text())
         .then(html => {
            setResult(html);
            setLoading(false)
         })
   };

   const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
   }

   const handleClear = () =>{
      setForm({
         pregnacies: "",
         glucose: "",
         blood_pressure: "",
         skin_thickness: "",
         insulin_level: "",
         bmi: "",
         diabetes_pedigree: "",
         age: ""
      });
      setResult("");
   };

   

   return (
      <form onSubmit={handleSubmit}>
         <h4>Diabetes Prediction Model</h4>
         <p>Example to predict diabetes probability</p>
         <input type="number" name="pregnacies" value={form.pregnacies} onChange={onChange} placeholder="Number of pregnacies" required/>
         <input type="number" name="glucose" value={form.glucose} onChange={onChange} placeholder="Glucose level in sugar" required/>
         <input type="number" name="blood_pressure"  value={form.blood_pressure} onChange={onChange} placeholder="Blood pressure" required/>
         <input type="number" name="skin_thickness" value={form.skin_thickness} onChange={onChange} placeholder="Skin Thickness" required/>
         <input type="number" name="insulin_level" value={form.insulin_level} onChange={onChange} placeholder="Insulin Level" required/>
         <input type="number" name="bmi" value={form.bmi} onChange={onChange} placeholder="BMI" required/>
         <input type="number" name="diabetes_pedigree" value={form.diabetes_pedigree} onChange={onChange} placeholder="Diabetes Pedigree" required/>
         <input type="number" name="age" value={form.age} onChange={onChange} placeholder="Age" required/>
         <button type="submit" disabled={loading}>{loading ? "Predicting results...":"Submit form"}</button>

         {result && <div dangerouslySetInnerHTML={{__html: result}} className='result'/>}
         {result && <span onClick={handleClear}>Clear Prediction</span>}
      </form>
   );
}

export default Form;
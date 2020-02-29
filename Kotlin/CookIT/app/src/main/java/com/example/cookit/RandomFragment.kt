package com.example.cookit

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import com.example.cookit.Models.RecipeDetails
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import com.squareup.picasso.Callback
import com.squareup.picasso.Picasso
import io.supercharge.shimmerlayout.ShimmerLayout
import kotlinx.android.synthetic.main.fragment_random.*
import kotlinx.coroutines.*
import kotlin.coroutines.CoroutineContext


class RandomFragment(recipeOperations: RecipeOperations) : Fragment() {

    private lateinit var rec: RecipeDetails

    private var recipeOptions = arrayOf("Primi", "Secondi", "Dolci", "Contorni", "Piatti Unici", "Lievitati", "Antipasti")
    private var recipeOptionsIndex = 0

    private var recipePortions = arrayOf(" 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 ", " 7 ", " 8 ", " 9 ")
    private var recipePortionsVal = 1

    private lateinit var portions: Spinner

    private lateinit var reciepLayout: LinearLayout
    private lateinit var shimmer: ShimmerLayout

    private lateinit var imageView: ImageView
    private lateinit var backButton: FloatingActionButton

    private lateinit var currentView: View

    private var ro: RecipeOperations = recipeOperations

    private lateinit var currentContext: Context

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,savedInstanceState: Bundle?): View? {
        currentView = inflater.inflate(R.layout.fragment_random, container, false)

        reciepLayout = currentView.findViewById(R.id.random_linear_layout)
        shimmer = currentView.findViewById(R.id.shimmerLayout)

        currentContext = this.requireContext()
        return currentView
    }

    override fun onStart() {
        super.onStart()

        imageView = currentView.findViewById(R.id.recipeImage)
        backButton = currentView.findViewById(R.id.backButton)

        setPortionSpinner()
        setTypeSpinner()

        // Image used to move to next Recipe
        imageView.setOnClickListener {
            var next= ro.getNext()
            if (next != null){
                rec = next
                displayRecipe(rec)
            }
            ro.fillFutureAndPreload(currentContext)
        }

        // Button to move to previous recipe
        backButton.setOnClickListener { view ->
            var prev = ro.getPrevious()
            if (prev != null){
                displayRecipe(prev)
                ro.fillFutureAndPreload(currentContext)
            }
            else{
                Snackbar.make(view, getString(R.string.recipt_unvailable), Snackbar.LENGTH_SHORT).show()
            }
        }

        CoroutineScope(Dispatchers.IO).launch {

            coroutineContext
            // Start filling queue
            // If queue is already full only display recipe
            ro.fillFutureAndPreload(currentContext)

            while(ro.getSize() <= 0){
            }
            rec = ro.getRecipe()!!

            CoroutineScope(Dispatchers.Main).launch {
                displayRecipe(rec)
            }
        }
    }

    override fun onStop() {
        super.onStop()

        ro.abortRequests()
    }

    //Function to apply all the data of the recipe onto the fragment
    fun displayRecipe(receipt: RecipeDetails){
        val imageUrl = receipt.image

        val title = receipt.name

        val time = (receipt.cookTime + receipt.prepTime).toString() + " minuti"

        var type = ""
        var quantity = ""
        for (el in receipt.recipeIngredient){
            var quantity_: String
            if (el.quantity != "q.b."){
                var bff = (el.quantity.toFloat() / receipt.recipeYield * recipePortionsVal)
                if (bff < 0){
                    bff = ((bff *100).toInt().toFloat()/100)
                }else if (bff < 2){
                    bff = ((bff *10).toInt().toFloat()/10)
                }else{
                    bff = bff.toInt().toFloat()
                }
                quantity_ = bff.toString()
            }
            else{
                quantity_ = ""
            }
            type += el.type + "\r\n"
            quantity += "$quantity_ ${el.unit}\r\n"
        }

        val instructions = receipt.recipeInstructions

        var Title = currentView.findViewById<TextView>(R.id.Title)
        var TotalTime= currentView.findViewById<TextView>(R.id.TotalTime)
        var Instructions = currentView.findViewById<TextView>(R.id.Instructions)
        var ingredient_quantity = currentView.findViewById<TextView>(R.id.ingredient_quantity)
        var ingredient_type= currentView.findViewById<TextView>(R.id.ingredient_type)
        var ingredientsLabel= currentView.findViewById<TextView>(R.id.ingredientsLabel)
        var instructionsLabel= currentView.findViewById<TextView>(R.id.instructionsLabel)

        Title.text = title
        Title.textSize = 35F
        Title.gravity = Gravity.CENTER
        TotalTime.text = time
        TotalTime.textSize = 25F
        Instructions.text = instructions
        Instructions.textSize = 15F

        ingredientsLabel.text = getString(R.string.ingredients_label)
        ingredientsLabel.textSize = 30F
        ingredientsLabel.gravity = Gravity.CENTER

        ingredient_type.text = type
        ingredient_quantity.text = "$quantity"

        ingredient_type.textSize = 15F
        ingredient_quantity.textSize = 15F

        instructionsLabel.text = getString(R.string.instructions_label)
        instructionsLabel.textSize = 30F
        instructionsLabel.gravity = Gravity.CENTER

        Picasso.with(this.requireContext()).load(imageUrl).into(imageView, image_load_callback())
    }

    private fun image_load_callback(): Callback? {

        shimmer.stopShimmerAnimation()
        shimmer.visibility = View.GONE
        random_linear_layout.visibility = View.VISIBLE
        return null
    }

    private fun setTypeSpinner(){
        var spinner = currentView.findViewById<Spinner>(R.id.RecipeType)
        var spinnerAdapter = ArrayAdapter(this.requireContext(), R.layout.spinner_conf, recipeOptions)
        spinnerAdapter.setDropDownViewResource(R.layout.spinner_conf)
        spinner.adapter = spinnerAdapter

        // If the (ro) class has an options selected, reselect it
        var option = ro.getOption()
        if (option != null) {
            recipeOptionsIndex = recipeOptions.indexOf(option!!)
            spinner.setSelection(recipeOptionsIndex)
            ro.setOption(recipeOptions[recipeOptionsIndex])
        }else{
            ro.setOption(recipeOptions[recipeOptionsIndex])
        }

        // Set an on item selected listener for spinner object
        // Spinner used to change type of recipe
        spinner.onItemSelectedListener = object: AdapterView.OnItemSelectedListener{
            var first = true
            override fun onItemSelected(parent:AdapterView<*>, view: View, position: Int, id: Long){
                if (!first) {
                    recipeOptionsIndex = position
                    ro.clearFuture()
                    ro.setOption(recipeOptions[recipeOptionsIndex])
                    ro.fillFutureAndPreload(currentContext)
                }else{
                    first = false
                }
            }
            override fun onNothingSelected(parent: AdapterView<*>){}
        }
    }

    private fun setPortionSpinner(){
        portions = currentView.findViewById(R.id.NumberOfPortions)
        var spinnerAdapter = ArrayAdapter(this.requireContext(), R.layout.spinner_conf2, recipePortions)
        spinnerAdapter.setDropDownViewResource(R.layout.spinner_conf2)
        portions!!.adapter = spinnerAdapter


        portions.setSelection(recipePortionsVal-1)

        // Set an on item selected listener for spinner object
        // Spinner used to change the ingredients quantities basing on portions
        portions.onItemSelectedListener = object: AdapterView.OnItemSelectedListener{
            var first = true
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                if (!first) {
                    recipePortionsVal = position + 1
                    if (ro.getRecipe() != null) {
                        rec = ro.getRecipe()!!
                        displayRecipe(rec)
                        ro.fillFutureAndPreload(currentContext)
                    }
                }else{
                    first = false
                }
            }
            override fun onNothingSelected(parent: AdapterView<*>){}
        }
    }

    companion object {
        fun newInstance(recipeOperations: RecipeOperations): RandomFragment = RandomFragment(recipeOperations)
    }

}

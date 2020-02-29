package com.example.cookit

import android.content.Context
import android.net.Uri
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.LinearLayout
import android.widget.ListView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.cookit.Models.IngredientsModel
import com.example.cookit.Models.RecipeDetails
import com.example.cookit.Models.RecipeNames
import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.Moshi
import com.squareup.moshi.Types
import kotlinx.android.synthetic.main.fragment_search.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import java.io.File
import java.net.URL

/**
 * A simple [Fragment] subclass.
 * Activities that contain this fragment must implement the
 * [SearchFragment.OnFragmentInteractionListener] interface
 * to handle interaction events.
 */
class SearchFragment(netOperations: NetOperations) : Fragment() {

    private val moshi: Moshi = Moshi.Builder().build()
    private val ingredientAdapter: JsonAdapter<IngredientsModel> = moshi.adapter(
        IngredientsModel::class.java)
    private val recipeAdapter: JsonAdapter<RecipeDetails> = moshi.adapter(
        RecipeDetails::class.java)

    val listType = Types.newParameterizedType(List::class.java, RecipeDetails::class.java)
    val listRecipeAdapter: JsonAdapter<List<RecipeDetails>> = moshi.adapter(listType)

    private var Ingredients = mutableListOf<String>()


    private var no = netOperations

    private lateinit var searchBar: AutoCompleteTextView
    private lateinit var current_view: View
    private lateinit var currentContext: Context

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        current_view = inflater.inflate(R.layout.fragment_search, container, false)
        //---------------------------------------------------------------------------------------------//
        currentContext = this.requireContext()
        return current_view
    }

    override fun onStart() {
        super.onStart()

        searchBar = current_view.findViewById(R.id.ingredient_search)


        var pathh = currentContext.filesDir
        val letDirectory = File(pathh, "data/recipeNames")
        letDirectory.mkdirs()
        var file = File(letDirectory, "names.txt")
        var namesString = file.readText()

        if (namesString == ""){
            file.writeText("{\"_id\":\"5e5847a9037304601d0e6359\",\"count\":1,\"ingredients\":[\"zucchero\"]}")
            namesString = file.readText()
        }


        CoroutineScope(Dispatchers.IO).launch {
            file.writeText(no.getAPI("/recipeIngredients"))
            namesString = file.readText()
            println(namesString)
        }

        var names = ingredientAdapter.fromJson(namesString)?.ingredients

        var itemList = current_view.findViewById<ListView>(R.id.items_list)

        var listAdapter = ArrayAdapter<String>(currentContext, android.R.layout.test_list_item, Ingredients)
        itemList.adapter = listAdapter

        var adapter = ArrayAdapter<String>(
            currentContext,
            android.R.layout.simple_dropdown_item_1line,
            names!!
        )

        searchBar.setAdapter(adapter)

        searchBar.setOnItemClickListener { parent, view, position, id ->

            Ingredients.add(searchBar.text.toString())
            listAdapter.notifyDataSetChanged()

            getRecipe()

            searchBar.setText("")
        }

        itemList.setOnItemLongClickListener{ parent, view, position, id ->
            Ingredients.remove(Ingredients[position])
            listAdapter.notifyDataSetChanged()

            getRecipe()

            return@setOnItemLongClickListener true
        }
    }

    private fun getRecipe(){
        CoroutineScope(Dispatchers.IO).launch {
            var res = no.getByIngredients(Ingredients, true)
            CoroutineScope(Dispatchers.Main).launch {
                var rec = listRecipeAdapter.fromJson(res)

                var recycler = current_view.findViewById<RecyclerView>(R.id.recipe_recycler)

                recycler.layoutManager = LinearLayoutManager(currentContext)

                recycler.adapter = RecyclerViewAdapter(rec)
            }
        }
    }

    companion object {
        fun newInstance(netOperations: NetOperations): SearchFragment = SearchFragment(netOperations)
    }

}
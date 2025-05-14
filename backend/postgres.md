<!-- markdownlint-disable -->


### DISTINCT(col_name): 
when you have duplicate values in a column data and you want unique values only: 
``` SELECT DISTINCT(col_name) FROM table;```

---
### COUNT(col_name):  
return the number of **rows** that each table has  
(it doesnt matter what col do u use):  
``` SELECT COUNT(col_name) FROM table;```  
``` SELECT COUNT(DISTINCT(col_name)) FROM table;```

---
### ORDER BY:
filtering the result - use it as a final command before LIMIT:  
``` SELECT col FROM table ORDER BY col ASC/DESC```  
ASC: lowest to highest (default)  
DESC: highest to lowest  
``` SELECT col FROM table ORDER BY col_1 ASC, col_2 DESC```

---
### LIMIT:  
last command:  

  ````
  SELECT * FROM payment 
  WHERE id > 5  
  ORDER BY price DESC
  LIMIT 10;
  ````  

---
### BETWEEN: 
includes both the lowest and highest values and values between them 

```` 
SELECT * FROM payment
WHERE amount BETWEEN 1 AND 3;
````
---
### IN:
select the col where the col values are as following:    
(we can use ``NOT`` keyword before ``IN`` to select everythig)  
``` SELECT color FROM table WHERE color IN ('red') ```

---
### LIKE / ILIKE:  
checks if a string matches a pattern using ``%`` (any characters) or ``_`` (one character)  
``LIKE`` = strict match  
``ILIKE`` = loose match (not case-sensitive)  
``` WHERE name LIKE 'Ali%' ```  -- only matches "Ali", not "ali"  
``` WHERE name ILIKE 'Ali%' ```  -- matches "Ali", "ali", "ALI", etc.  
``` SELECT * FROM users WHERE name LIKE '_li' ``` -- can use double underscore

**TRANSLATION:**  
get the cols where the ``name`` starts with ``Ali`` and continues with w.e


# Aggregate Functions:
* A function that takes multiple input and returns a single output 
* Happens in SELECT or HAVING clause only

  **AVG()** → returns avg value (returns float)  
  **COUNT()** → returns number of values  
  **MAX()** → returns maximum value  
  **MIN()** → returns minmum value  
  **SUM()** → returns the sum of all the values 

``` SELECT MAX(cost), MIN(cost) FROM table ```   
``` SELECT ROUND(AVG(cost), 2) FROM table ``` → returns float with 2 digits

---
### GROUP BY:  
**Groups rows that have the same values in specified column(s)**  
It's usually used with aggregate functions to calculate something per group  

<pre>
SELECT column, AGG_FUNCTION(column) 
FROM table 
GROUP BY column;
</pre>

#### Notes:
1. We need to choose a categorical column to GROUP BY
2. ``SELECT`` it and use another col to to perform AGG functions
3. ``GROUP BY`` clause must appear after ``FROM`` or ``WHERE`` statement
4. In ``SELECT`` statement, columns must have an AGG function or be in ``GROUP BY`` afterwards
5. ``WHERE`` statement should not refer to AGG function results
6. If you wanna **sort** the results in AGG function, you must reference the entire function not just the column

---
### HAVING:
``HAVING`` is like ``WHERE``, but it’s used after ``GROUP BY`` on aggregate functions

<pre>
SELECT product, SUM(price)
FROM sales
GROUP BY product
HAVING SUM(price) > 15;
</pre>
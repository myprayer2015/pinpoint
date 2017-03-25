package test;

import Jama.Matrix;
import Jama.*;
import com.mkobos.pca_transform.PCA;

/**
 * An example program using the library
 */
public class PCA_Test {
    public static void main(String[] args) {
        System.out.println("Running a demonstration program on some sample data ...");
        /** Training data matrix with each row corresponding to data point and
         * each column corresponding to dimension. */
        Matrix trainingData = new Matrix(new double[][]{
                {1, 2, 3, 4, 5, 6},
                {6, 5, 4, 3, 2, 1},
                {2, 2, 2, 2, 2, 2}});

        Matrix trainingDataX = new Matrix(new double[][]{{1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,0,1,1,0,0,5,0,1,1,1,0,0,0,1,0,1,1,1,0,0},
                {0,1,5,0,0,1,0,0,1,0,1,1,1,0,0,1,1,1,0,0,4,1,3,0,0,0,0,0,0,0,3,1,1,1,0},
                {1,2,3,1,0,2,0,1,0,0,1,1,1,0,0,0,1,1,0,0,2,1,2,0,0,0,0,1,0,1,2,1,9,0,1},
                {0,2,4,0,1,2,1,1,0,0,1,1,2,0,0,1,1,1,2,0,5,2,1,2,1,0,1,1,0,1,2,1,0,0,0},
                {2,1,3,1,0,0,1,1,1,0,1,1,1,0,0,2,0,0,1,0,2,1,3,0,0,0,0,1,0,1,1,1,1,0,3},
                {2,0,8,1,1,3,2,1,1,0,4,2,2,1,1,5,2,2,0,0,10,3,3,2,1,0,1,24,0,0,3,5,14,0,5},
                {1,1,6,1,0,3,1,1,0,0,1,2,1,0,1,1,1,1,1,2,6,2,4,1,1,0,1,2,0,1,8,5,2,1,2},
                {1,1,5,1,0,2,2,1,0,1,2,1,1,0,1,0,2,1,1,1,3,2,3,2,2,0,1,2,0,1,3,3,1,1,1},
                {1,0,3,0,0,0,1,1,0,0,3,0,0,0,0,0,1,1,0,0,4,0,0,1,1,0,1,1,0,0,0,1,1,0,1},
                {0,1,1,0,1,0,1,1,0,0,0,1,1,0,1,2,0,0,0,0,1,1,2,1,1,0,0,1,0,1,1,0,1,0,2},
                {0,1,1,1,0,1,1,2,0,1,4,1,0,0,0,1,2,1,0,0,5,2,6,2,1,1,0,2,0,0,2,2,1,0,2},
                {1,2,1,0,1,0,1,1,0,0,0,1,1,0,1,1,0,0,1,0,1,1,0,1,1,0,1,1,0,1,2,2,0,1,0}});

        PCA pca = new PCA(trainingData);

        pca.getOutputDimsNo();
        pca.getEigenvalue(10);

        pca.getEigenvectorsMatrix();

        /** Test data to be transformed. The same convention of representing
         * data points as in the training data matrix is used. */
        Matrix testData = new Matrix(new double[][]{
                {1, 2, 3, 4, 5, 6},
                {1, 2, 1, 2, 1, 2}});
        /** The transformed test data. */
        Matrix transformedData = pca.transform(testData, PCA.TransformationType.WHITENING);
        System.out.println("Transformed data (each row corresponding to transformed data point):");
        for (int r = 0; r < transformedData.getRowDimension(); r++) {
            for (int c = 0; c < transformedData.getColumnDimension(); c++) {
                System.out.print(transformedData.get(r, c));
                if (c == transformedData.getColumnDimension() - 1) continue;
                System.out.print(", ");
            }
            System.out.println("");
        }
    }
}